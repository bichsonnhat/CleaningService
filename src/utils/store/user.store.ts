import { auth, currentUser } from '@clerk/nextjs/server';

// Separate the server-only initialization logic
export async function initializeServerAuth() {
  const [userInstance, authInstance] = await Promise.all([
    currentUser(),
    auth()
  ]);

  return {
    userId: userInstance?.id || null,
    role: authInstance.sessionClaims?.metadata?.role || undefined
  };
}

// These functions can be used in server components
export async function getServerUserId() {
  const { userId } = await initializeServerAuth();
  return userId;
}

export async function getServerUserRole() {
  const { role } = await initializeServerAuth();
  return role;
}