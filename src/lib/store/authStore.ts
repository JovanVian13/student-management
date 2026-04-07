import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/lib/types/user";
import usersData from "@/lib/data/users.json";

const setCookie = (value: string) => {
  document.cookie = `auth-storage=${value}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 hari
};

const deleteCookie = () => {
  document.cookie = "auth-storage=; path=/; max-age=0";
};

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, password) => {
        const users = usersData as User[];
        const found = users.find(
          (u) => u.email === email && u.password === password && u.is_active
        );
        if (found) {
          set({ user: found });
          setCookie(JSON.stringify({ state: { user: found } }));
          return true;
        }
        return false;
      },

      register: (name, email, password) => {
        const users = usersData as User[];
        const exists = users.find((u) => u.email === email);
        if (exists) return false;

        const newUser: User = {
          id: Date.now(),
          name,
          email,
          password,
          is_active: true,
          register_date: new Date().toISOString(),
        };
        set({ user: newUser });
        setCookie(JSON.stringify({ state: { user: newUser } }));
        return true;
      },

      logout: () => {
        set({ user: null });
        deleteCookie();
      },

      isAuthenticated: () => !!get().user,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);