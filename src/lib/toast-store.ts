"use client";
import { create } from "zustand";

type ToastState = {
  message: string | null;
  show: (msg: string) => void;
  clear: () => void;
};

let timeout: ReturnType<typeof setTimeout> | null = null;

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (msg) => {
    set({ message: msg });
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => set({ message: null }), 2500);
  },
  clear: () => set({ message: null }),
}));
