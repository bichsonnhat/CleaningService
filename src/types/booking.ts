interface BookingInfoItem {
  name: string;
  value: string;
}

export interface BookingData {
  // Step 0: Select service category
  serviceCategory?: {
    id: string,
    name: string
  };

  // Step 1: Booking Information
  bookingInfomation?: BookingInfoItem[];

  // Step 2: Booking Date
  bookingDate?: Date;

  // Step 3: Booking Timing
  bookingTiming?: number;

  // Step 4: Booking Address
  bookingAddress?: string;
  APT?: string;
  howToGetIn?: string;
  anySpecificSpot?: string[];
  anyPet?: boolean;
  petNote?: string;
  additionalNote?: string;

  // Page 5: Payment Details
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  contactNote?: string;
  checked?: boolean;

  bookingNote?: string;
  totalPrice?: number;
}