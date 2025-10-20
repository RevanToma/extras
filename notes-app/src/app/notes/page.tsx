'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  notesListQueryOptions,
  createNote,
  notesKeys,
  invalidateNotes,
} from '@/lib/notes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Star } from 'lucide-react';
import { Note } from '@/types';
import { PageHeader } from '@/components/PageHeader';
import { LoadingCard } from '@/components/LoadingCard';
import { ErrorCard } from '@/components/ErrorCard';

export default function NotesPage() {
  const router = useRouter(),
    queryClient = useQueryClient(),
    [title, setTitle] = useState(''),
    [body, setBody] = useState(''),
    [favorite, setFavorite] = useState(false),
    [isSubmitting, setIsSubmitting] = useState(false);

  const { data: notes, isLoading, error } = useQuery(notesListQueryOptions());

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: notesKeys.all });

      const previousNotes = queryClient.getQueryData<Note[]>(notesKeys.lists());

      const optimisticNote: Note = {
        id: Date.now(),
        title: newNote.title,
        body: newNote.body || '',
        favorite: newNote.favorite,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Note[]>(notesKeys.lists(), (old) => [
        optimisticNote,
        ...(old || []),
      ]);

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(notesKeys.lists(), context.previousNotes);
      }
    },
    onSettled: () => {
      invalidateNotes(queryClient);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await createNoteMutation.mutateAsync({
        title: title.trim(),
        body: body.trim(),
        favorite,
      });
      setTitle('');
      setBody('');
      setFavorite(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 px-4 max-w-4xl'>
        <PageHeader
          title='My Notes'
          description='Create and manage your notes'
        />
        <LoadingCard message='Loading notes...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto py-8 px-4 max-w-4xl'>
        <PageHeader
          title='My Notes'
          description='Create and manage your notes'
        />
        <ErrorCard message={`Error loading notes: ${error.message}`} />
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-4 max-w-4xl'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>My Notes</h1>
        <p className='text-muted-foreground'>Create and manage your notes</p>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Plus className='h-5 w-5' />
            Add New Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter note title...'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='body'>Body (optional)</Label>
              <Textarea
                id='body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='Enter note content...'
                rows={3}
              />
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='favorite'
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className='rounded'
              />
              <Label htmlFor='favorite'>Mark as favorite</Label>
            </div>
            <Button
              type='submit'
              disabled={!title.trim() || isSubmitting}
              className='w-full'
            >
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        {!notes || notes.length === 0 ? (
          <Card>
            <CardContent className='py-8 text-center'>
              <p className='text-muted-foreground'>
                No notes yet. Create your first note above!
              </p>
            </CardContent>
          </Card>
        ) : (
          [...notes]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((note) => (
              <Card
                key={note.id}
                className='cursor-pointer hover:shadow-md transition-shadow'
                onClick={() => router.push(`/notes/${note.id}`)}
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg'>{note.title}</CardTitle>
                      <p className='text-xs text-muted-foreground'>
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                      {note.favorite && (
                        <div className='flex items-center gap-1 mt-1'>
                          <Star className='h-4 w-4 text-yellow-500 fill-current' />
                          <span className='text-sm text-yellow-600'>
                            Favorite
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {note.body && (
                  <CardContent>
                    <CardDescription className='line-clamp-3'>
                      {note.body}
                    </CardDescription>
                  </CardContent>
                )}
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
