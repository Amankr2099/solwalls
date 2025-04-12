import { Client, Account,Databases, ID, Query } from "appwrite";

import conf from '@/conf/conf';

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);


client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId); // Replace with your project ID

 // Signup User
//  async function signup(email, password, username) {
//   try {
//     const user = await account.create(ID.unique(), email, password, username);
//     await databases.createDocument(
//       conf.appwriteDatabaseId,   // Replace with your database ID
//       conf.appwriteUsersId,              // Collection ID
//       user.$id,             // Use the same ID as Appwrite Authentication
//       {
//         userId:user.$id,
//       }
//     );
//     return { success: true, user };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }


async function loginWithGoogle(redirectURL) {
  try {
    await account.createOAuth2Session("google", redirectURL, redirectURL,["openid", "profile", "email"]);
        // Get user details after login
        const user = await account.get();
    
        // Check if user exists in the collection
        const query = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteUsersId,   [
          Query.equal("email", user.email)
        ]);
    
        if (query.total === 0) {
          // Add new user to the collection
          try {
            await databases.createDocument(conf.appwriteDatabaseId, conf.appwriteUsersId,  ID.unique(), {
              email: user.email,
              userId: user.$id,
            });
          } catch (error) {
            console.error("Error creating user:", error);
          }
        }
  } catch (error) {
    console.error("Google OAuth error:", error);
    throw new Error("Google authentication failed.");
  }
}
// Logout User
async function logout() {
  try {
    await account.deleteSession("current");
    cookies().delete('a_session_6766f2300032b4f3eb2e_legacy');
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Get Current User
async function getUser() {
  try {
    const user = await account.get();
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}

// // Update Email
// async function updateEmail(newEmail, password) {
//   try {
//     await account.updateEmail(newEmail, password);
//     return { success: true };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }

// // Change Password
// async function updatePassword(newPassword, oldPassword) {
//   try {
//     await account.updatePassword(newPassword, oldPassword);
//     return { success: true };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }


async function getUserProfile() {
  try {
    const user = await account.get(); // Get user from authentication

    // Fetch additional user details from the database
    const userProfile = await databases.getDocument(
      conf.appwriteDatabaseId,   // Replace with your database ID
      conf.appwriteUsersId,             // Collection ID
      user.$id             // Use the same ID
    );
    console.log(user);

    return { success: true, user: { ...user, profile: userProfile } };
  } catch (error) {
    return { success: false, message: error.message };
  }
}


export { signup,logout,getUser ,getUserProfile, loginWithGoogle,getCurrentUser}