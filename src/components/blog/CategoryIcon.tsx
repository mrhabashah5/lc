import { BookOpen, Car, FileCheck, LineChart, ShieldAlert, Smartphone, type LucideProps } from "lucide-react";
import type { BlogCategory } from "@/lib/blog";

const icons = { file: FileCheck, phone: Smartphone, shield: ShieldAlert, book: BookOpen, chart: LineChart, car: Car };

export function CategoryIcon({ icon, ...props }: { icon: BlogCategory["icon"] } & LucideProps) {
  const I = icons[icon];
  return <I aria-hidden="true" {...props} />;
}
