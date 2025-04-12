import { Client, Databases, Query } from 'appwrite';
import conf from '@/conf/conf';
import { getSession } from 'next-auth/react';

const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId); // Replace with your project ID

    // Get Wall by ID
async function getUserProfile() {
    const session = await getSession();
    
    try {
        const userDoc = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteUsersId,
            [Query.equal("email", `${session.user.email}`)]
          );
    
        const user = userDoc.documents[0];
        return user;
    } catch (error) {
        console.error('Error fetching wall by ID:', error);
        throw error;
    }
}

export {getUserProfile}