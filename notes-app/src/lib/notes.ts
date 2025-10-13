import { Note } from '@/types';
import { QueryClient } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000';

export const notesKeys = {
  all: ['notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (filters: string) => [...notesKeys.lists(), { filters }] as const,
  details: () => [...notesKeys.all, 'detail'] as const,
  detail: (id: number) => [...notesKeys.details(), id] as const,
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  return BASE_URL;
};

export const notesListQueryOptions = () => ({
  queryKey: notesKeys.lists(),
  queryFn: async (): Promise<Note[]> => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return response.json();
  },
});

export const noteByIdQueryOptions = (id: number) => ({
  queryKey: notesKeys.detail(id),
  queryFn: async (): Promise<Note> => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/notes/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Note not found');
      }
      throw new Error('Failed to fetch note');
    }
    return response.json();
  },
});

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create note');
  }

  return response.json();
};

export const updateNote = async (
  id: number,
  note: Partial<Note>
): Promise<Note> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update note');
  }

  return response.json();
};

export const deleteNote = async (id: number): Promise<Note> => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete note');
  }

  return response.json();
};

export const prefetchNotesList = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(notesListQueryOptions());
};

export const prefetchNote = async (queryClient: QueryClient, id: number) => {
  await queryClient.prefetchQuery(noteByIdQueryOptions(id));
};

export const invalidateNotes = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: notesKeys.all });
};
