import { create } from 'zustand';

type Role = 'Helper' | 'Customer' | ''; 

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

export const userRoleStore = create<RoleState>((set) => ({
  role: '', 
  setRole: (role) => set({ role }), 
}));
