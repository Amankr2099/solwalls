import { Client, Databases, Storage, ID, Query } from 'appwrite';
import conf from '@/conf/conf';

const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId); // Replace with your project ID


// Get Wall by ID
async function getWallById(wallId) {
    try {
        const response = await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteWallsId,
            wallId
        );
        return response;
    } catch (error) {
        console.error('Error fetching wall by ID:', error);
        throw error;
    }
}
// async function getAllWalls() {
//     try {
//         const response = await databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteWallsId
//         );
//         return response.documents; // This returns the array of documents
//     } catch (error) {
//         console.error('Error fetching all walls:', error);
//         throw error;
//     }
// }

async function getMultipleWallsByIds(wallIds) {
    try {
        const wallPromises = wallIds.map((id) =>
            databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteWallsId,
                id
            )
        );

        const walls = await Promise.all(wallPromises);
        return walls;
    } catch (error) {
        console.error('Error fetching multiple walls by IDs:', error);
        throw error;
    }
}


// Get Walls by Theme
async function getWallsByTheme(theme) {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteWallsId,
            [Query.equal('theme', theme)]
        );
        return response.documents;
    } catch (error) {
        console.error('Error fetching walls by theme:', error);
        return [];
    }
}

async function getWallsByTags(tags) {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteWallsId, // Replace with your Walls collection ID
            [Query.search('tags', tags)] // Search for any of the tags
        );

        // console.log('Walls with tags:', tags, response.documents);
        return response.documents;
    } catch (error) {
        console.error('Error fetching walls by tags:', error);
        return [];
    }
}

// Get Image URL
function getImageURL(fileId) {
    try {
        const imageURL = storage.getFilePreview(conf.appwriteBucketId, fileId);
        console.log(imageURL);
        
        return imageURL;
    } catch (error) {
        console.error('Error generating image URL:', error);
        throw error;
    }
}

async function getTopRecentWalls() {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteWallsId,
        [
          Query.orderDesc('$createdAt'), // Sort by creation date in descending order
          Query.limit(3),               // Limit the result to 3 documents
        ]
      );
      // console.log("Top 3 recent walls:", response.documents);
      return response.documents;
    } catch (error) {
      console.error("Error fetching top recent walls:", error);
      throw error;
    }
  };

// async function updateWallImageURL(wallId, newImageURL) {
//     try {
//         const updated = await databases.updateDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteWallsId,
//             wallId,
//             { imageURL: newImageURL }
//         );
//         return updated;
//     } catch (error) {
//         console.error('Error updating wall image URL:', error);
//         throw error;
//     }
// }

  export { 
    getWallById, 
    getMultipleWallsByIds,
    getWallsByTheme, 
    getWallsByTags, 
    getImageURL, 
    getTopRecentWalls ,
};

