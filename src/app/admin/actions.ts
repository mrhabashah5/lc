"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAdmin } from "@/lib/auth";
import {
  deleteConsultation,
  deleteMessage,
  setMessageRead,
  updateConsultation,
} from "@/lib/db";
import { consultationStatuses, type ConsultationStatus } from "@/lib/options";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

const toId = (v: FormDataEntryValue | null) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
};

export async function saveConsultation(formData: FormData) {
  await guard();
  const id = toId(formData.get("id"));
  const status = String(formData.get("status")) as ConsultationStatus;
  if (!id || !consultationStatuses.includes(status)) return;
  await updateConsultation(id, status, String(formData.get("notes") ?? "").slice(0, 5000));
  revalidatePath("/admin", "layout");
}

export async function removeConsultation(formData: FormData) {
  await guard();
  const id = toId(formData.get("id"));
  if (!id) return;
  await deleteConsultation(id);
  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function toggleMessageRead(formData: FormData) {
  await guard();
  const id = toId(formData.get("id"));
  if (!id) return;
  await setMessageRead(id, formData.get("read") === "1");
  revalidatePath("/admin", "layout");
}

export async function removeMessage(formData: FormData) {
  await guard();
  const id = toId(formData.get("id"));
  if (!id) return;
  await deleteMessage(id);
  revalidatePath("/admin", "layout");
}
