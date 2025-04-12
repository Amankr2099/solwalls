'use client'
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { getUserProfile } from '../api/user';
import Wallpaper from '@/components/Wallpaper';
import Link from 'next/link';
import UserWallpapers from '@/components/UserWallpapers';

export default function UserProfile() {

	const { data: session, status } = useSession();

	const [user, setUser] = useState({})
	const [error, setError] = useState()


	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUserProfile()
				if (data) {
					setUser(data)

				}
			} catch (err) {
				// console.error("Error fetching data:", err); // Log the error for debugging
			}
		}
		if (session) {
			fetchData()
		}
	}, [session])

	if (status === 'loading') return <div className='bg-gray-400 rounded-md p-14 text-center m-10'> <p>Loading session...</p> </div>;
	if (!session) return <div className='bg-gray-400 rounded-md p-14 text-center m-10'> <p>Problem connecting...  </p> </div>;

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center ">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl text-center">

				<Image
					src={session.user.image}
					width={80}
					height={80}
					className='rounded-full mx-auto m-4'
					alt="avatar"
				/>


				<h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
				<p className="text-gray-600">{user.email}</p>
			</div>


			{/* Downloaded Wallpapers */}
			<div className="mt-6 w-full max-w-4xl">
				<h2 className="text-xl font-semibold text-gray-700 mb-4">Downloaded Wallpapers</h2>
				{
					user.purchasedWalls ? (
						<UserWallpapers wallIds={user.purchasedWalls} />

					):(
						<div>sdfgsd</div>
					)
				}
			</div>
		</div>
	);
}
