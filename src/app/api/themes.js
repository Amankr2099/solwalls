// /pages/api/themes.js
import { Client, Databases, Query } from 'appwrite';
import conf from '@/conf/conf';

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId); // Replace with your project ID

// Get all Themes
async function getThemes() {
  try {
    const response = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteThemeId);
    return response.documents;
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
}

// Get Theme by Name
async function getThemeByName(themeName) {
  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteThemeId,
      [Query.equal('theme', themeName)]
    );
    if (response.documents.length > 0) {
      return response.documents[0];
    } else {
      console.log('No theme found with the name:', themeName);
      return null;
    }
  } catch (error) {
    console.error('Error fetching theme:', error);
    throw error;
  }
}


async function getTags(query) {
  try {
    const result = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteThemeId,
      [] // Fetch all themes, or filter further if needed
    );

    const tags = result.documents
      .flatMap((doc) => doc.tags)
      .filter((tag, i, arr) => arr.indexOf(tag) === i) // unique
      .filter((tag) => tag.toLowerCase().startsWith(query.toLowerCase()));

    return tags;
  } catch (err) {
    console.error('Error fetching theme:', err);
    throw err;
  }
  
}



export {getThemeByName,getThemes,getTags}

