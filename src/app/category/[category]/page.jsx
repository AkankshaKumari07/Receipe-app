"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const CategoryPage = (param) => {
  const categoryName = param.params.Category;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${categoryName}`
      );
      const result = await response.json();
      setData(result.meals || []); // Set an empty array as default if result.meals is null or undefined
    };

    fetchMeals();
  }, [categoryName]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mt-10 text-center">
        {data && data.map((d) => { // Add a check to ensure data is not null or undefined
          return (
            <div key={d.idMeal}> {/* Ensure each child in a list has a unique "key" prop */}
              <div>
                <Image
                  src={d.strMealThumb}
                  alt="image"
                  width={250}
                  height={100}
                  className="rounded-lg border-2 border-teal-500 hover:border-yellow-500 cursor-pointer transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h2>{d.strMeal}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryPage;
