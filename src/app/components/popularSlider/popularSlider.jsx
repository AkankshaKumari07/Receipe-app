"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import useFetchData from "@/app/use-fetch";

const PopularSlider = () => {
  const {
    data: meals,
    loading,
    error,
  } = useFetchData("https://www.themealdb.com/api/json/v1/1/search.php?s");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  let slidesToShow = 4; // Default value for larger screens

  if (isMobile) {
    slidesToShow = 1; // For mobile screens, show only 1 slide
  } else if (window.innerWidth < 1024) {
    slidesToShow = 2; // For medium-sized screens, show 2 slides
  } else if (window.innerWidth < 1624) {
    slidesToShow = 3; // For large screens, show 2 slides
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="h-[50vh] md:w-[90%] md:m-auto md:mt-20 mt-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings} className="m-8">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="m-8 md:ml-24">
              <Link href={`/${meal.idMeal}`} passHref>
                <Image
                  src={meal.strMealThumb}
                  width={290}
                  height={100}
                  alt={meal.strMeal}
                  className="rounded-lg border-2 border-teal-500 hover:border-yellow-500 cursor-pointer transition-transform duration-300 transform hover:scale-110"
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PopularSlider;
