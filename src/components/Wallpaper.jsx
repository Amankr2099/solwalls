import Image from "next/image";

const Wallpaper = ({ wallURL }) => {
  return (
    <div className="relative group ">
      <Image
        src={wallURL}
        alt="wallpaper"
        width={800}
        height={600}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-lg">
      </div>
    </div>
  );
};

export default Wallpaper;
