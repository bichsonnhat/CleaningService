import { create } from 'zustand';
import { BookingData } from '@/types/booking';

export const bookingStore = create((set) => ({
    bookingData: {} as BookingData,
    updateBookingData: (data: Partial<BookingData>) => set((state: any) => ({ bookingData: { ...state.bookingData, ...data } })),
}));