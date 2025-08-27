import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);

let authPromise: Promise<any> | null = null;

async function authenticate() {
  if (!pb.authStore.isValid) {
    if (!authPromise) {
      authPromise = pb.admins.authWithPassword(
        process.env.POCKETBASE_ADMIN_EMAIL!,
        process.env.POCKETBASE_ADMIN_PASSWORD!
      );
      try {
        await authPromise;
      } finally {
        authPromise = null;
      }
    } else {
      await authPromise;
    }
  }
}

export async function getAuthenticatedPocketBase() {
  await authenticate();
  return pb;
}
