export {}

// Create a type for the roles
export type Roles = 'admin' | 'customer' | 'helper'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}