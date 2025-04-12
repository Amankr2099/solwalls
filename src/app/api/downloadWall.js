import { Client, Databases, Query, Storage } from 'appwrite';
export const client = new Client();

import conf from "@/conf/conf";
import { getSession } from 'next-auth/react';
const storage = new Storage(client);


client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId); // Replace with your project ID



const databases = new Databases(client);




async function downloadImage(fileId) {
  try {
    const downloadURL = storage.getFileDownload(conf.appwriteBucketId, fileId); // Replace with your storage bucket ID
    const session = await getSession();

    if (session) {
      // Query to get the user document based on email (or use session.user.id if you store userId)
      const userDoc = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersId,
        [Query.equal("email", `${session.user.email}`)]
      );

      const user = userDoc.documents[0];

      const wallDoc = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteWallsId,
        [Query.equal("imageId", fileId)]
      );
      
      const wallId = wallDoc.documents[0].$id;

      const updatedWalls = user.purchasedWalls || [];
      if (!updatedWalls.includes(wallId)) {
        updatedWalls.push(wallId);
      }

      await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersId,
        user.$id,
        {
          purchasedWalls: updatedWalls // entire array of wall IDs
        }
      );
    }

    return downloadURL;
  } catch (error) {
    console.error("Error generating download URL:", error);
    throw error;
  }
};


export { downloadImage }
