'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';

const PopularSlider = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(data)
        setMeals(data.meals);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="h-[50vh] w-[90%] m-auto mt-28">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Slider {...settings} className="m-8">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="m-8 ml-24">
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
