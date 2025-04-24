"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getTags } from "@/app/api/themes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { session } = useAuth();
  const { data: session, status } = useSession();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const data = await getTags(query);
      setSuggestions(data);
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (tag) => {
    setQuery(""); // Clear input
    setSuggestions([]); // Hide suggestions
    router.push(`/tag/${tag}`); // Navigate to wallpapers with that tag
  };


  return (
    <div>
      <header className="flex justify-around items-center p-4 border-b">
        {/* Logo */}
        <div className="w-full sm:w-auto text-center sm:text-left">
          <Link href="/" className="text-white block">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              SolWalls
            </h1>
          </Link>
        </div>

        {/* Responsive input bar */}
         {/* Search Bar */}
         <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-4 py-2 rounded w-full text-gray-800"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white border rounded shadow z-50 text-gray-400">
              {suggestions.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="flex justify-between ">
          {/* Navbar links - visible on large screens */}
          <div className="hidden sm:flex space-x-5">
            {session ? (
              <div>
                <Link href={"/profile"}>
                  <button
                    type="submit"
                    className="bg-gray-700 rounded-lg mr-5 text-gray-400 hover:text-gray-100 px-4 py-3"
                  >
                    <p>Profile</p>
                  </button>
                </Link>

                <button
                  type="submit"
                  className="bg-gray-700 rounded-lg  text-gray-400 hover:text-gray-100 px-4 py-3"
                  onClick={() => signOut()}
                >
                  <p>Logout</p>
                </button>
              </div>
            ) : (
              <div>
                <Link href={"/login"} className="mr-5">
                  <button
                    type="submit"
                    className="bg-gray-700 rounded-lg text-gray-400 hover:text-gray-100 px-4 py-3"
                  >
                    <p>Login</p>
                  </button>
                </Link>

                <Link href={"/join"}>
                  <button
                    type="submit"
                    className="bg-gray-700 rounded-lg  text-gray-400 hover:text-gray-100 px-4 py-3"
                  >
                    <p>Join</p>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger menu icon (visible on small screens) */}

          {/* Mobile menu - visible when hamburger icon is clicked */}
          {isMenuOpen && (
            <div className="sm:hidden absolute right-4 top-16 bg-gray-800 p-3 rounded-lg space-y-1 space-x-5">
              {session ? (
                <div>
                  <Link href={"/profile"}>
                    <button
                      type="submit"
                      className="bg-gray-700 rounded-lg mb-5 text-gray-400 hover:text-gray-100 px-4 py-3"
                    >
                      <p>Profile</p>
                    </button>
                  </Link>

                  <button
                    type="submit"
                    className="bg-gray-700 rounded-lg  text-gray-400 hover:text-gray-100 px-4 py-3"
                    onClick={() => signOut()}
                  >
                    <p>Logout</p>
                  </button>
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <button
                      type="submit"
                      className="bg-gray-700 rounded-lg mb-5 text-gray-400 hover:text-gray-100 px-3 py-2"
                    >
                      <p>Login</p>
                    </button>
                  </Link>
                  <br />
                  <Link href={"/join"}>
                    <button
                      type="submit"
                      className="bg-gray-700 rounded-lg  text-gray-400 hover:text-gray-100 px-3 py-2"
                    >
                      <p>Join</p>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="sm:hidden text-gray-400 hover:text-gray-100 p-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa-solid fa-bars h-6 w-6" />{" "}
          {/* FontAwesome Hamburger Icon */}
        </button>
      </header>
    </div>
  );
}
