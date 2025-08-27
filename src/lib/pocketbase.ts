import PocketBase from 'pocketbase';

// This function creates a NEW PocketBase instance for each request.
// This is important in serverless environments to avoid sharing a single
// instance (and its auth state) across different user requests.
const createPocketBaseInstance = () => new PocketBase(process.env.POCKETBASE_URL);

/**
 * Returns a PocketBase instance authenticated with admin credentials.
 * This should be used for server-side actions that require admin privileges.
 * It ensures that a new, clean instance is used for each operation and
 * that it is properly authenticated.
 */
export async function getAuthenticatedPocketBase() {
  const pb = createPocketBaseInstance();

  // We authenticate with admin credentials for every server-side operation
  // that requires it. This is a secure and stateless approach suitable for
  // server actions.
  await pb.collection('admins').authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL!,
    process.env.POCKETBASE_ADMIN_PASSWORD!
  );

  return pb;
}
