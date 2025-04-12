
import { getMultipleWallsByIds } from "@/app/api/walls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Wallpaper from "./Wallpaper";

const UserWallpapers = ({ wallIds }) => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMultipleWallsByIds(wallIds);
        if (response) {
          // console.log(response);

          setWalls(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };
    fetchData();
  }, [wallIds]);

  return (
    <div>
      {loading ? (
        <div className="text-black">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {walls.map((wall, index) => (
              <Link
                key={index}
                href={`/wallpaper/${wall.$id}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Wallpaper wallURL={wall.imageURL} />
                
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWallpapers;
