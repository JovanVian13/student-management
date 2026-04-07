import { create } from "zustand";
import type { Mahasiswa } from "@/lib/types/mahasiswa";
import dummyData from "@/lib/data/mahasiswa.json";

interface MahasiswaState {
  data: Mahasiswa[];
  add: (mhs: Omit<Mahasiswa, "id" | "created_at" | "updated_at">) => void;
  update: (id: number, mhs: Partial<Omit<Mahasiswa, "id" | "created_at">>) => void;
  remove: (id: number) => void;
  getById: (id: number) => Mahasiswa | undefined;
  search: (query: string) => Mahasiswa[];
}

export const useMahasiswaStore = create<MahasiswaState>((set, get) => ({
  data: dummyData as Mahasiswa[],

  add: (mhs) => {
    const newMahasiswa: Mahasiswa = {
      ...mhs,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set((state) => ({ data: [...state.data, newMahasiswa] }));
  },

  update: (id, mhs) => {
    set((state) => ({
      data: state.data.map((m) =>
        m.id === id
          ? { ...m, ...mhs, updated_at: new Date().toISOString() }
          : m
      ),
    }));
  },

  remove: (id) => {
    set((state) => ({
      data: state.data.filter((m) => m.id !== id),
    }));
  },

  getById: (id) => {
    return get().data.find((m) => m.id === id);
  },

  search: (query) => {
    if (!query.trim()) return get().data;
    const q = query.toLowerCase();
    return get().data.filter(
      (m) =>
        m.nim.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  },
}));