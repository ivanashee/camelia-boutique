"use client";
import { useTransition } from "react";
import type { OrderStatus } from "@/lib/types";
import { updateOrderStatus } from "./actions";

const STATUSES: OrderStatus[] = [
  "pendiente",
  "confirmado",
  "preparando",
  "enviado",
  "entregado",
  "cancelado",
];

export default function StatusSelect({ id, status }: { id: string; status: OrderStatus }) {
  const [pending, start] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as OrderStatus;
        start(() => { updateOrderStatus(id, next); });
      }}
      className="input !py-1 !px-2 text-xs"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
