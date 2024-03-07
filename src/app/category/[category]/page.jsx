'use client'
import React from "react";
import Image from "next/image";
import useFetchData from "@/app/use-fetch";import Link from "next/link";
;

const CategoryPage = ({ params }) => {
  const categoryName = params.category;
  const { data, loading } = useFetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${categoryName}`);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="md:min-h-[55vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-6 text-center p-4">
          {data.map((d) => ( 
            <div key={d.idMeal}>
              <div>
                <Link href={`/${d.idMeal}`} passHref>
                <Image
                  src={d.strMealThumb}
                  alt="image"
                  width={330}
                  height={100}
                  className="rounded-lg mx-auto border-2 border-teal-500 hover:border-yellow-500 cursor-pointer transition-transform duration-300 transform hover:scale-110"
                />
                </Link>
              </div>
              <h2 className="font-bold text-lg mt-4 leading-snug">{d.strMeal}</h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
