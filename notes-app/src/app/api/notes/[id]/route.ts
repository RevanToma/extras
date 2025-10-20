import { NextRequest, NextResponse } from 'next/server';
import { db, notes } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params,
      noteId = parseInt(id),
      rows = await db.select().from(notes).where(eq(notes.id, noteId));

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    const note = {
      id: Number(row.id),
      title: row.title,
      body: row.content || '',
      favorite: Boolean(row.favorite),
      createdAt: row.createdAt.toISOString(),
    };

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

    const result = await db
      .update(notes)
      .set({
        title: title.trim(),
        content: noteBody?.trim() || '',
        favorite: favorite ? 1 : 0,
      })
      .where(eq(notes.id, noteId))
      .execute();

    const rows = await db.select().from(notes).where(eq(notes.id, noteId));
    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    const updated = {
      id: Number(row.id),
      title: row.title,
      body: row.content || '',
      favorite: Boolean(row.favorite),
      createdAt: row.createdAt.toISOString(),
    };

    return NextResponse.json(updated);
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
      rows = await db.select().from(notes).where(eq(notes.id, noteId));

    const row = rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    await db.delete(notes).where(eq(notes.id, noteId)).execute();

    const deleted = {
      id: Number(row.id),
      title: row.title,
      body: row.content || '',
      favorite: Boolean(row.favorite),
      createdAt: row.createdAt.toISOString(),
    };

    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
