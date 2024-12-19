import { create } from 'zustand';
import { UserInfo } from '@/types/user';

export const userStore = create((set) => ({
    userInfo: {} as UserInfo,
    updateUserInfo: (data: Partial<UserInfo>) => set((state: any) => ({ userInfo: { ...state.userInfo, ...data } })),
}));