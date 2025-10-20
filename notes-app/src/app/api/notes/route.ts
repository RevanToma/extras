import { NextRequest, NextResponse } from 'next/server';
import { db, notes } from '@/db';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const rows = await db.select().from(notes).orderBy(desc(notes.createdAt));
    const data = rows.map((r) => ({
      id: Number(r.id),
      title: r.title,
      body: r.content || '',
      favorite: Boolean(r.favorite),
      createdAt: r.createdAt.toISOString(),
    }));
    return NextResponse.json(data);
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

    const [insertResult] = await db
      .insert(notes)
      .values({
        title: title.trim(),
        content: noteBody?.trim() || '',
        favorite: favorite ? 1 : 0,
      })
      .execute();

    const insertedId = Number(insertResult.insertId);
    const [row] = await db.select().from(notes).where(eq(notes.id, insertedId));

    const newNote = {
      id: Number(row.id),
      title: row.title,
      body: row.content || '',
      favorite: Boolean(row.favorite),
      createdAt: row.createdAt.toISOString(),
    };

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
