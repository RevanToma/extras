import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Note } from '@/types';

const filePath = path.join(process.cwd(), 'notes.json');

async function readNotes(): Promise<Note[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    const initial: Note[] = [];
    await writeNotes(initial);
    return initial;
  }
}

async function writeNotes(notes: Note[]) {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2), 'utf-8');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params,
      notes = await readNotes(),
      noteId = parseInt(id),
      note = notes.find((n) => n.id === noteId);

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read note' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params,
      body = await request.json(),
      { title, body: noteBody, favorite } = body,
      noteId = parseInt(id);

    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const notes = await readNotes(),
      noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title.trim(),
      body: noteBody?.trim() || '',
      favorite: Boolean(favorite),
    };

    await writeNotes(notes);

    return NextResponse.json(notes[noteIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params,
      noteId = parseInt(id),
      notes = await readNotes(),
      noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    const deletedNote = notes[noteIndex];
    notes.splice(noteIndex, 1);
    await writeNotes(notes);

    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
