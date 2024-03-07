"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import useFetchData from "../use-fetch";

const SinglePage = ({ params }) => {
  const { data: mealData, loading: mealLoading } = useFetchData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealId}`
  );
  console.log(mealData);
  const [active, setActive] = useState("ingredient");
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  if (mealLoading) return <div>Loading...</div>;

  const meal = mealData[0]; // mealData is an array, so access the first element

  const ingredients = [
    { ingredient: meal.strIngredient1, measure: meal.strMeasure1 },
    { ingredient: meal.strIngredient2, measure: meal.strMeasure2 },
    { ingredient: meal.strIngredient3, measure: meal.strMeasure3 },
    { ingredient: meal.strIngredient4, measure: meal.strMeasure4 },
    { ingredient: meal.strIngredient5, measure: meal.strMeasure5 },
    { ingredient: meal.strIngredient6, measure: meal.strMeasure6 },
  ];

  const availableIngredients = ingredients.filter((item) => item.ingredient);

  return (
    <div className="md:min-h-[550px]">
      <h1 className="lg:text-4xl md:text-2xl text-2xl font-bold text-center mt-6">
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
          <div className="flex md:justify-start md:items-start justify-center items-center">
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
              <div className="mt-10 font-bold lg:text-3xl md:text-xl text-xl">
                {availableIngredients.map((item, index) => (
                  <h2 key={index}>
                    {item.ingredient} <span className="ml-5">-</span>
                    <span className="ml-5">{item.measure}</span>
                  </h2>
                ))}
              </div>
            ) : (
              <div className="mt-10 md:mr-10 md:ml-0 ml-8">
                <p className="md:max-w-[800px] max-w-[360px] text-justify lg:text-lg md:text-base text-base">
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
                <div>
                  <p className="mt-5 lg:text-xl md:text-base text-base">
                    Watch the video below for visual instructions :
                  </p>
                  <Link href={meal.strYoutube} passHref>
                    <div className="flex items-center text-blue-600 lg:text-lg md:text-base text-sm hover:text-blue-800 underline">
                      <FaYoutube className="w-6 h-6 text-red-600 mr-2 " />
                      {meal.strYoutube}
                    </div>
                  </Link>
                  <Link href={meal.strSource} passHref>
                    <div className="flex flex-col mt-5 lg:text-xl md:text-base text-base">
                      Read about {meal.strMeal} :
                      <span className="text-blue-600 lg:text-lg md:text-base text-sm hover:text-blue-800 underline">
                        {meal.strSource}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
