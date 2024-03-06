"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SinglePage = ({ params }) => {
  const [active, setActive] = useState("ingredient");
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const [mealData, setMealData] = useState(null);
  const [mealLoading, setMealLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setMealData(data.meals[0]);
        setMealLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setMealLoading(false);
      }
    };

    fetchData();
  }, [params.mealId]);

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  if (mealLoading) return <div>Loading...</div>;

  const meal = mealData;

  return (
    <div className="min-h-[550px]">
      <h1 className="md:text-4xl text-2xl font-bold text-center mt-6">
        {meal.strMeal}
        <span className="ml-2">({meal.strArea})</span>
      </h1>
      <div className="flex md:flex-row flex-col mt-12">
        <div className="md:w-[50%] flex justify-center items-center">
          <div>
            <Image
              src={meal.strMealThumb}
              alt="image"
              width={350}
              height={250}
              className="rounded-lg border-2 border-teal-500 hover:border-yellow-500 cursor-pointer transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        </div>
        <div className="md:w-[50%] text-left md:ml-[5rem] md:mx-0 mx-auto md:mt-0 mt-10">
          <div className="flex">
            <button
              className={`${
                active === "ingredient" ? "bg-yellow-500" : "bg-gray-300"
              } text-black font-semibold p-2 border-2 border-blue-700`}
              onClick={() => {
                setActive("ingredient");
              }}
            >
              Ingredients
            </button>
            <button
              className={`${
                active === "instruction" ? "bg-yellow-500" : "bg-gray-300"
              } text-black font-semibold p-2 border-2 border-blue-700 ml-4`}
              onClick={() => {
                setActive("instruction");
              }}
            >
              Instructions
            </button>
          </div>
          <div>
            {active === "ingredient" ? (
              <div className="mt-10 font-bold md:text-3xl text-xl">
                {Object.keys(meal)
                  .filter((key) => key.startsWith("strIngredient") && meal[key])
                  .map((key) => (
                    <h2 key={key}>
                      {meal[key]} <span className="ml-5">-</span>
                      <span className="ml-5">
                        {meal[`strMeasure${key.slice(-1)}`]}
                      </span>
                    </h2>
                  ))}
              </div>
            ) : (
              <div className="mt-10">
                <p className="w-[800px] text-justify">
                  {showFullInstructions
                    ? meal.strInstructions
                    : `${meal.strInstructions.substring(0, 200)}...`}
                </p>
                {meal.strInstructions.length > 200 && (
                  <button
                    onClick={toggleInstructions}
                    className="text-blue-600 underline mt-2"
                  >
                    {showFullInstructions ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
