import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const getImageUrl = (collectionId: string, recordId: string, filename: string) => {
  return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${filename}`;
};
