"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
    setSearch("");
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full bg-blue-800 md:py-8 md:px-6 flex md:flex-row flex-col justify-between items-center">
      <Link href="/" passHref>
        <h1 className="w-full font-bold 2xl:text-2xl xl:text-2xl lg:text-2xl text-3xl md:text-base 2xl:ml-10 xl:mr-10 xl:ml-0 lg:ml-0 md:ml-0 md:mt-0 mt-8 md:mb-0 mb-5">
          Receipe App
        </h1>
      </Link>
      <div className="w-[300px] md:w-1/3 py-2 px-4 rounded-md bg-white md:mb-0 mb-5 text-black">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search your favourite dish..."
            value={search}
            onChange={handleInputChange}
            className="w-full outline-none focus:ring-0"
          />
        </form>
      </div>
      <div className="flex 2xl:space-x-12 xl:space-x-6 lg:space-x-4 md::space-x-2  space-x-4 xl:ml-[20rem] text-xl 2xl:text-xl xl:text-xl lg:text-xl md:text-base 2xl:mr-20 font-semibold md:mt-0 mt-5 md:mb-0 mb-12 cursor-pointer">
        <Link href={`/category/indian`} className="text-white hover:underline">
          Indian
        </Link>
        <Link href={`/category/american`} className="text-white hover:underline">
          American
        </Link>
        <Link href={`/category/british`} className="text-white hover:underline">
          British
        </Link>
        <Link href={`/category/chinese`} className="text-white hover:underline">
          Chinese
        </Link>
        <Link href={`/category/thai`} className="text-white hover:underline">
          Thai
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
