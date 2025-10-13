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

export async function GET() {
  try {
    const notes = await readNotes();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(),
      { title, body: noteBody, favorite = false } = body;

    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const notes = await readNotes(),
      newId = Math.max(...notes.map((n) => n.id), 0) + 1;

    const newNote: Note = {
      id: newId,
      title: title.trim(),
      body: noteBody?.trim() || '',
      favorite: Boolean(favorite),
    };

    notes.push(newNote);
    await writeNotes(notes);

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
