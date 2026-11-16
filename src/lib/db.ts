import "server-only";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { createClient, type Client, type InStatement, type ResultSet } from "@libsql/client";
import type { ConsultationInput, ConsultationStatus } from "./options";

/*
 * Database: libSQL (SQLite-compatible).
 * - Production (e.g. Vercel): set TURSO_DATABASE_URL (libsql://…) and TURSO_AUTH_TOKEN.
 * - Local development: with no URL set, a local file is used (data/loanclear.db).
 */

const g = globalThis as unknown as { __lcDb?: Client; __lcReady?: Promise<void> };

function connect(): Client {
  if (g.__lcDb) return g.__lcDb;
  const remote = process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL;
  let url = remote;
  if (!url) {
    const dir = process.env.DATABASE_DIR ?? path.join(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    url = "file:" + path.join(dir, "loanclear.db").replace(/\\/g, "/");
  }
  g.__lcDb = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  return g.__lcDb;
}

const SCHEMA: string[] = [
  `CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL,
    contact_method TEXT NOT NULL,
    loan_type TEXT NOT NULL,
    lender_name TEXT NOT NULL DEFAULT '',
    amount_range TEXT NOT NULL,
    loan_status TEXT NOT NULL,
    service_needed TEXT NOT NULL,
    message TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    admin_notes TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status)`,
  `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0
  )`,
];

/** Creates tables on first use (safe to run repeatedly). */
function ready(): Promise<void> {
  g.__lcReady ??= connect()
    .batch(SCHEMA, "write")
    .then(() => undefined)
    .catch((err) => {
      g.__lcReady = undefined; // retry on the next request
      throw err;
    });
  return g.__lcReady;
}

async function run(stmt: InStatement): Promise<ResultSet> {
  await ready();
  return connect().execute(stmt);
}

/** Converts libSQL rows into plain objects. */
function rows<T>(rs: ResultSet): T[] {
  return rs.rows.map((r) => {
    const o: Record<string, unknown> = {};
    rs.columns.forEach((c, i) => {
      const v = r[i];
      o[c] = typeof v === "bigint" ? Number(v) : v;
    });
    return o as T;
  });
}

export type Consultation = {
  id: number;
  reference: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  contact_method: string;
  loan_type: string;
  lender_name: string;
  amount_range: string;
  loan_status: string;
  service_needed: string;
  message: string;
  status: ConsultationStatus;
  admin_notes: string;
};

export type Message = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: number;
};

function newReference() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `LC-${ymd}-${rand}`;
}

export async function createConsultation(d: ConsultationInput): Promise<string> {
  const reference = newReference();
  await run({
    sql: `INSERT INTO consultations
            (reference, created_at, full_name, phone, email, city, contact_method,
             loan_type, lender_name, amount_range, loan_status, service_needed, message)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      reference,
      new Date().toISOString(),
      d.fullName,
      d.phone,
      d.email,
      d.city,
      d.contactMethod,
      d.loanType,
      d.lenderName,
      d.amountRange,
      d.loanStatus,
      d.serviceNeeded,
      d.message,
    ],
  });
  return reference;
}

export async function listConsultations(status?: ConsultationStatus): Promise<Consultation[]> {
  const rs = status
    ? await run({ sql: "SELECT * FROM consultations WHERE status = ? ORDER BY id DESC", args: [status] })
    : await run("SELECT * FROM consultations ORDER BY id DESC");
  return rows<Consultation>(rs);
}

export async function getConsultation(id: number): Promise<Consultation | undefined> {
  const rs = await run({ sql: "SELECT * FROM consultations WHERE id = ?", args: [id] });
  return rows<Consultation>(rs)[0];
}

export async function updateConsultation(id: number, status: ConsultationStatus, notes: string) {
  await run({ sql: "UPDATE consultations SET status = ?, admin_notes = ? WHERE id = ?", args: [status, notes, id] });
}

export async function deleteConsultation(id: number) {
  await run({ sql: "DELETE FROM consultations WHERE id = ?", args: [id] });
}

export async function consultationCounts(): Promise<Record<string, number>> {
  const rs = await run("SELECT status, COUNT(*) AS n FROM consultations GROUP BY status");
  const out: Record<string, number> = { total: 0 };
  for (const r of rows<{ status: string; n: number }>(rs)) {
    out[r.status] = r.n;
    out.total += r.n;
  }
  return out;
}

export async function createMessage(m: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  await run({
    sql: "INSERT INTO messages (created_at, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)",
    args: [new Date().toISOString(), m.name, m.email, m.phone, m.subject, m.message],
  });
}

export async function listMessages(): Promise<Message[]> {
  return rows<Message>(await run("SELECT * FROM messages ORDER BY id DESC"));
}

export async function unreadMessageCount(): Promise<number> {
  const rs = await run("SELECT COUNT(*) AS n FROM messages WHERE is_read = 0");
  return rows<{ n: number }>(rs)[0]?.n ?? 0;
}

export async function setMessageRead(id: number, read: boolean) {
  await run({ sql: "UPDATE messages SET is_read = ? WHERE id = ?", args: [read ? 1 : 0, id] });
}

export async function deleteMessage(id: number) {
  await run({ sql: "DELETE FROM messages WHERE id = ?", args: [id] });
}
