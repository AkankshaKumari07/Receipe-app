"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import useFetchData from "@/app/use-fetch";

const TrendingSlider = () => {
  const { data: meals, loading } = useFetchData(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const slidesToShow = isMobile ? 2 : 8;

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    cssEase: "linear",
  };

  return (
    <div className="w-full h-[50vh]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="m-8">
              <Link href={`/${meal.idMeal}`} passHref>
                <Image
                  src={meal.strMealThumb}
                  width={140}
                  height={20}
                  alt={meal.strMeal}
                  className="rounded-lg border-2 border-teal-500 overflow-hidden hover:border-yellow-500 cursor-pointer transition-transform duration-300 transform hover:scale-110"
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrendingSlider;
