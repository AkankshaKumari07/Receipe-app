"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState} from "react";

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
    <div className= " w-full bg-blue-800 py-8 px-6 flex md:flex-row flex-col justify-between items-center">
      <Link href="/" passHref>
        <h1 className="font-bold text-2xl md:ml-10">Recipe App</h1>
      </Link>
      <div className="md:w-1/3 py-2 px-4 rounded-md bg-white text-black">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search your favourite dish..."
            value={search}
            onChange={handleInputChange}
            className="outline-none focus:ring-0"
          />
        </form>
      </div>
      <div className="md:flex hidden md:space-x-12 md:ml-[20rem] text-xl md:mr-20 font-semibold"> 
        <Link href={`/category/indian`} className="text-white hover:underline">
          Indian
        </Link>
        <Link
          href={`/category/american`}
          className="text-white hover:underline"
        >
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
      {/* Mobile View */}
      <div className="md:hidden w-full py-2 px-4 rounded-md bg-white text-black mt-4">
        <Link href={`/category/indian`} className="block text-black font-bold hover:underline">
          Indian
        </Link>
        <Link href={`/category/american`} className="block text-black font-bold hover:underline mt-2">
          American
        </Link>
        <Link href={`/category/british`} className="block text-black font-bold hover:underline mt-2">
          British
        </Link>
        <Link href={`/category/chinese`} className="block text-black font-bold hover:underline mt-2">
          Chinese
        </Link>
        <Link href={`/category/thai`} className="block text-black font-bold hover:underline mt-2">
          Thai
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
