'use client'
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';

const TrendingSlider = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMeals(data.meals);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isMobile =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 768px)').matches
      : false; // Check if viewport is mobile

  // Set different number of slides based on viewport size
  const slidesToShow = isMobile ? 3 : 6;

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    cssEase: 'linear',
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
