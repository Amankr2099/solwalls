const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteThemeId: String(process.env.NEXT_PUBLIC_APPWRITE_THEME_COLLECTION_ID),
    appwriteWallsId: String(process.env.NEXT_PUBLIC_APPWRITE_WALLS_COLLECTION_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    adminId:String(process.env.NEXT_ADMIN_ID),
    appwriteUsersId:String(process.env.NEXT_PUBLIC_APPWRITE_USERS_ID),
}

export default conf