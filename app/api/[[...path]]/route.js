import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'vds_trading';

let cachedClient = null;

async function getDb() {
  if (cachedClient) return cachedClient.db(DB_NAME);
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client.db(DB_NAME);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return json({ ok: true, service: 'VDS Trading API', time: new Date().toISOString() });
    }
    if (path === 'contacts') {
      const db = await getDb();
      const items = await db
        .collection('contacts')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return json({ items });
    }
    return json({ error: 'Not found', path }, 404);
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500);
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));

    if (path === 'contact') {
      const { name, email, phone, vertical, message } = body || {};
      if (!name || !email || !message) {
        return json({ error: 'name, email, and message are required' }, 400);
      }
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: String(phone || '').slice(0, 50),
        vertical: String(vertical || 'general').slice(0, 50),
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || '',
      };
      const db = await getDb();
      await db.collection('contacts').insertOne(doc);
      return json({ success: true, id: doc.id, message: 'Thanks! Our team will reach out within 24 hours.' });
    }

    return json({ error: 'Not found', path }, 404);
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500);
  }
}
