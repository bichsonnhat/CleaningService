export {}

// Create a type for the roles
export type Roles = 'admin' | 'customer' | 'helper'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles,
      BookingStatus?: {
        isSelectService?: boolean,
        isStep1Completed?: boolean,
        isStep2Completed?: boolean,
        isStep3Completed?: boolean,
        isStep4Completed?: boolean,
      }
    }
  }
}