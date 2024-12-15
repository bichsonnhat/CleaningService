import { auth, currentUser } from '@clerk/nextjs/server';

let userId: string | null = null;
let role: string | undefined = undefined;

export async function initializeGlobalUserId() {
  const user = await currentUser();
  userId = user?.id || null;
  return userId;
}

export async function initializeGlobalUserRole() {
    role = (await auth()).sessionClaims?.metadata?.role || undefined;
    return role;
}

export function getUserId() {
  return userId;
}

export function getUserRole() {
  return role;
}


