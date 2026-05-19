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

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.scripts);
}

export async function POST(request: NextRequest) {
  const db = await readDB();
  const script = await request.json();

  const newScript = {
    ...script,
    id: `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.scripts.push(newScript);
  await writeDB(db);

  return NextResponse.json(newScript, { status: 201 });
}
