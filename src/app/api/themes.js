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

export {getThemeByName,getThemes}

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     // For creating a theme
//     const { themeName } = req.body;
//     try {
//         if (themeName) {
//             const themes = await getThemeByName();
//             res.status(200).json(themes);
//         }else{
//             const themes = await getThemes();
//             res.status(200).json(themes);
//         }
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching themes' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
