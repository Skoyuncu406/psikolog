"use client";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAdmin: false,

  setAdmin: () => set({ isAdmin: true }),

  logout: () => set({ isAdmin: false }),
}));
