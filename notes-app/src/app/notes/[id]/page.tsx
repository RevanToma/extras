'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  noteByIdQueryOptions,
  updateNote,
  deleteNote,
  notesKeys,
  invalidateNotes,
} from '@/lib/notes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Star, Save, Trash2, Edit } from 'lucide-react';
import { Note } from '@/types';
import { LoadingCard } from '@/components/LoadingCard';
import { ErrorCard } from '@/components/ErrorCard';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default function NotePage({ params }: NotePageProps) {
  const router = useRouter(),
    queryClient = useQueryClient(),
    { id } = use(params),
    noteId = parseInt(id);

  const [isEditing, setIsEditing] = useState(false),
    [title, setTitle] = useState(''),
    [body, setBody] = useState(''),
    [favorite, setFavorite] = useState(false),
    [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery(noteByIdQueryOptions(noteId));

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body || '');
      setFavorite(note.favorite);
    }
  }, [note]);

  const updateNoteMutation = useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: number;
      title: string;
      body: string;
      favorite: boolean;
    }) => updateNote(id, data),
    onMutate: async ({ id, title, body, favorite }) => {
      await queryClient.cancelQueries({ queryKey: notesKeys.detail(id) });

      const previousNote = queryClient.getQueryData<Note>(notesKeys.detail(id));

      const optimisticNote: Note = {
        id,
        title,
        body,
        favorite,
      };

      queryClient.setQueryData(notesKeys.detail(id), optimisticNote);

      queryClient.setQueryData<Note[]>(notesKeys.lists(), (old) =>
        old?.map((n) => (n.id === id ? optimisticNote : n))
      );

      return { previousNote };
    },
    onError: (err, variables, context) => {
      if (context?.previousNote) {
        queryClient.setQueryData(
          notesKeys.detail(variables.id),
          context.previousNote
        );
        queryClient.setQueryData<Note[]>(notesKeys.lists(), (old) =>
          old?.map((n) => (n.id === variables.id ? context.previousNote! : n))
        );
      }
    },
    onSettled: () => {
      invalidateNotes(queryClient);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: notesKeys.all });

      const previousNote = queryClient.getQueryData<Note>(notesKeys.detail(id));
      const previousNotes = queryClient.getQueryData<Note[]>(notesKeys.lists());

      queryClient.setQueryData<Note[]>(notesKeys.lists(), (old) =>
        old?.filter((n) => n.id !== id)
      );
      queryClient.removeQueries({ queryKey: notesKeys.detail(id) });

      return { previousNote, previousNotes };
    },
    onError: (_err, id, context) => {
      if (context?.previousNote) {
        queryClient.setQueryData(notesKeys.detail(id), context.previousNote);
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(notesKeys.lists(), context.previousNotes);
      }
    },
    onSuccess: () => {
      router.push('/notes');
    },
    onSettled: () => {
      invalidateNotes(queryClient);
    },
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await updateNoteMutation.mutateAsync({
        id: noteId,
        title: title.trim(),
        body: body.trim(),
        favorite,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNoteMutation.mutateAsync(noteId);
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const handleCancel = () => {
    if (note) {
      setTitle(note.title);
      setBody(note.body || '');
      setFavorite(note.favorite);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 px-4 max-w-2xl'>
        <LoadingCard message='Loading note...' />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className='container mx-auto py-8 px-4 max-w-2xl'>
        <ErrorCard
          message={
            error ? `Error loading note: ${error.message}` : 'Note not found'
          }
        />
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-4 max-w-2xl'>
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              {isEditing ? (
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='edit-title'>Title</Label>
                    <Input
                      id='edit-title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='Enter note title...'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='edit-body'>Body</Label>
                    <Textarea
                      id='edit-body'
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder='Enter note content...'
                      rows={6}
                    />
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      id='edit-favorite'
                      checked={favorite}
                      onChange={(e) => setFavorite(e.target.checked)}
                      className='rounded'
                    />
                    <Label htmlFor='edit-favorite'>Mark as favorite</Label>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className='text-2xl mb-2'>{note.title}</CardTitle>
                  {note.favorite && (
                    <div className='flex items-center gap-1 mb-2'>
                      <Star className='h-4 w-4 text-yellow-500 fill-current' />
                      <span className='text-sm text-yellow-600'>Favorite</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isEditing ? (
            <div className='flex gap-2'>
              <Button
                onClick={handleSave}
                disabled={!title.trim() || isSubmitting}
                className='flex-1'
              >
                <Save className='h-4 w-4 mr-2' />
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
              <Button variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className='space-y-4'>
              {note.body && (
                <div className='prose max-w-none'>
                  <p className='whitespace-pre-wrap'>{note.body}</p>
                </div>
              )}
              <div className='flex gap-2 pt-4 border-t'>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className='h-4 w-4 mr-2' />
                  Edit
                </Button>
                <Button
                  variant='destructive'
                  onClick={handleDelete}
                  disabled={deleteNoteMutation.isPending}
                >
                  <Trash2 className='h-4 w-4 mr-2' />
                  {deleteNoteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
