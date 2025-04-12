import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";  // Import GitHubProvider
import { Client, Databases, ID, Query } from "appwrite";
import conf from "@/conf/conf";

const client = new Client();
client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId); // Your Appwrite project ID

const databases = new Databases(client);

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // Add GitHub provider here
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID, // Add your GitHub Client ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // Add your GitHub Client Secret
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // or "database" if you're using a DB
    maxAge: 10 * 60 * 60, // 10 hours in seconds
    updateAge: 60 * 60,   // Optional: refresh token every 1 hour
  },
  callbacks: {
    // async session({ session, token, user }) {
    //   session.user.id = token.sub;
    //   return session;
    // },
    async signIn({ user }) {
      try {
        const appwriteUserId = user.id; // Unique identifier from Google or GitHub
        const email = user.email;
        const name = user.name;


        // Check if user exists in Appwrite
        const existingUsers = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteUsersId, [
          Query.equal("email", email),
        ]);

        if (existingUsers.total === 0) {
          // If user doesn't exist, create a new document
          await databases.createDocument(conf.appwriteDatabaseId, conf.appwriteUsersId, ID.unique(), {
            userId: appwriteUserId,
            name,
            email,
            purchasedWalls: [],
          });
        }

        return true;
      } catch (error) {
        console.error("Appwrite signIn error:", error);
        return false;
      }
    },
  },
};

export default options;
