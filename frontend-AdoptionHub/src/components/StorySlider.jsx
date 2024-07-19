import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const StorySlider = ({ stories }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full mx-auto">
      <Slider {...settings}>
        {stories?.map((story, index) => (
          <div key={index} className="p-4">
            <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-16 shadow-md">
              <div className="w-24 h-24 mt-5 rounded-full overflow-hidden mx-auto border-4 border-white">
                <img
                  src={story.storyImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-center bg-white p-4 text-gray-600">
                <p className="text-sm font-medium">{story.story}</p>
              </blockquote>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StorySlider;
