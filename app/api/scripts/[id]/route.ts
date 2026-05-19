import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DB_PATH = join(process.cwd(), 'data', 'db.json');

async function readDB() {
  try {
    const data = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { tasks: [], scripts: [] };
  }
}

async function writeDB(data: any) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await readDB();
  const { id } = await params;
  const updates = await request.json();

  const scriptIndex = db.scripts.findIndex((s: any) => s.id === id);
  if (scriptIndex === -1) {
    return NextResponse.json({ error: 'Script not found' }, { status: 404 });
  }

  db.scripts[scriptIndex] = {
    ...db.scripts[scriptIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeDB(db);
  return NextResponse.json(db.scripts[scriptIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await readDB();
  const { id } = await params;

  db.scripts = db.scripts.filter((s: any) => s.id !== id);
  await writeDB(db);

  return NextResponse.json({ success: true });
}
