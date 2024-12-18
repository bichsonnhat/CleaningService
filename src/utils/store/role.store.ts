import { create } from 'zustand';

type Role = 'Helper' | 'Customer' | ''; 

interface UserState {
  role: Role;
  id: string;
  setRole: (role: Role) => void;
  setId: (id: string) => void;
}

export const userStore = create<UserState>((set) => ({
  role: '', 
  id: '',
  setRole: (role) => set({ role }), 
  setId: (id) => set({ id }), 
}));
