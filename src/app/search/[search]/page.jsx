"use client";
import Image from 'next/image';
import Link from 'next/link';
import useFetchData from '@/app/use-fetch';

const SearchElements = ({ params }) => {
  const searchTerm = params.search;
  const { data, loading } = useFetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="font-bold text-xl text-center flex flex-col justify-center items-center md:min-h-[55vh] min-h-[40vh] ">
              No results found for "{searchTerm}"
              <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                  Go to Home
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-6 text-center p-4">
              {data.map((d) => {
                return (
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
                    <h2 className="font-bold text-lg mt-4 leading-snug">
                      {d.strMeal}
                    </h2>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchElements;
