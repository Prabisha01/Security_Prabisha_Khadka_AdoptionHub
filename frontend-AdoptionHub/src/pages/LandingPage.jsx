import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";

const LandingPage = () => {
  const products = [
    {
      id: 1,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 2,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 3,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 4,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
  ];
  return (
    <>
      <div className="bg-white">
        <div
          className="relative w-full h-[800px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('assets/images/landingpage.png')",
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute bottom-40 right-0 p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow"
            style={{ border: "solid" }}
          >
            <div className="flex justify-between w-96 text-center">
              <div>
                <div className="font-bold text-3xl">23</div>
                <div className="text-3xl">Adopted</div>
              </div>
              <div>
                <div className="font-bold text-3xl">236</div>
                <div className="text-3xl">Waiting</div>
              </div>
              <div>
                <div className="font-bold text-3xl">45</div>
                <div className="text-3xl">Pet Item</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-6 md:p-20 items-center gap-6 md:gap-24 justify-center">
          <div className="">
            <img
              src="assets/images/cat.png"
              alt="Welcome Cat"
              className="mx-auto rounded-3xl object-cover border-2 border-gray-300"
              style={{ width: "100%", maxWidth: "500px" }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-bold text-left text-2xl md:text-4xl">
              Welcome Your New{" "}
              <span className="text-orange-600">Furry Friend</span> into a{" "}
              <br className="hidden md:inline" />
              Loving Home Today
            </h1>
            <p className="mt-4 text-left">
              Discover the Joy of Adopting a Pet and Transforming Your Life with
              Unconditional Love
            </p>
            <div className="flex justify-center md:justify-end mt-8">
              <button className="bg-orange-500 text-white font-bold text-xl md:text-2xl px-16 py-2 w-full md:w-auto rounded hover:bg-orange-600">
                Adopt
              </button>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-4xl">
            Pamper Your Pet with
            <span className="text-orange-600">Tasty</span> Treats
          </h1>
          <p className="mt-1">Because Your Pet Deserves the Best</p>
        </div>

        <div className="bg-white py-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Recently Added
          </h2>
          <div className="flex justify-between overflow-x-auto no-scrollbar md:px-80 mb-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[160px] w-[400px] bg-gray-100 rounded-lg shadow-md p-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">{product.name}</p>
                  <button className="bg-orange-400 text-white text-xs px-3 py-1 rounded hover:bg-orange-600 mt-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-4xl mb-3">
            Be Part of the Cause. Participate in <br />
            Pet <span className="text-orange-600">Adoption</span> Event
          </h1>
          <p className="mt-1">
            Are you ready to join with multiple organizations for a paw-some
            cause? We're thrilled to invite you to
            <br /> our <span className="font-bold">Collaborative</span> pet
            adoption event.
          </p>
        </div>

        <div className="flex flex-col md:flex-row p-6 md:p-20 items-center gap-6 md:gap-48 justify-center">
          <div className="">
            <img
              src="assets/images/empower.png"
              alt="Welcome Cat"
              className="mx-auto rounded-3xl object-cover border-2 border-gray-300"
              style={{ width: "100%", maxWidth: "500px" }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-bold text-left text-2xl md:text-4xl">
              Empowering
              <span className="text-orange-600">Happy Lives,</span> One
              <br className="hidden md:inline" />
              Donation at a Time.
            </h1>
            <p className="mt-4 text-left">
              Discover the Joy of Adopting a Pet and Transforming Your Life with
              <br />
              <span className="font-bold">Unconditional</span> Love
            </p>
            <div className="flex justify-center md:justify-end mt-8">
              <button className="bg-orange-500 text-white font-bold text-xl md:text-2xl px-16 py-2 w-full md:w-auto rounded hover:bg-orange-600">
                Donate
              </button>
            </div>
          </div>
        </div>

        <div className="md:mx-80 m-5 md:p-20" style={{ backgroundImage: "url('assets/images/landingpage.png')",}}>
          <div className=" bg-white flex flex-col md:flex-row md:p-8 md:mx-8 border border-black items-center gap-6 md:gap- justify-center">
            <form className="space-y-4 w-full">
              <h1 className="font-bold text-5xl">
                Get In <span className="text-orange-500">Touch</span>
              </h1>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border-2 border-gray-800 rounded-md focus:border-orange-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 border-2 border-gray-800 rounded-md focus:border-orange-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full p-4 border-2 border-gray-800 rounded-md focus:border-orange-500"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md"
              >
                Send
              </button>
            </form>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1401.8199301169543!2d85.32952567350087!3d27.7060244248381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2z4KS44KSr4KWN4KSf4KS14KS-4KSw4KS_4KSV4KS-IOCkleCksuClh-CknA!5e0!3m2!1sne!2snp!4v1719846302324!5m2!1sne!2snp"
                className="rounded-lg shadow-lg border-black border-2 w-full h-[200px] md:h-[500px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-4xl mb-3">
          Where Dreams Find Their <span className="text-orange-600">Happily </span>Ever After  Event
          </h1>
          <p className="mt-1">
          "Adopt now and become part of our  
             our <span className="font-bold">Success</span> Story! Share your journey with us."
          </p>
        </div>

        <div className="container mx-auto">
            <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
                {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={6} visibleSlides={3} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer" id="prev">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    <Slide index={0}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={1}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={2}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={3}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={4}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={5}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                   
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" id="next">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={6} visibleSlides={2} step={1} infinite={true}>
                <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer" id="prev">
                           <FontAwesomeIcon icon={faChevronLeft} />
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    <Slide index={0}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={1}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={2}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={3}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={4}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={5}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                   
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" id="next">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={50} isIntrinsicHeight={true} totalSlides={6} visibleSlides={1} step={1} infinite={true}>
                <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer" id="prev">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    <Slide index={0}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={1}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={2}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={3}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={4}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                    <Slide index={5}>
                                    <div className="max-w-sm mx-auto border-2 border-black bg-gradient-to-b from-blue-500 via-blue-200 to-blue-100 rounded-lg p-6 h-[400px] space-y-4 shadow-md">
                                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white bg-white">
                                        <img src="/assets/images/cat.png" alt="profile" className="w-full h-full object-cover" />
                                      </div>
                                      <blockquote className="text-center bg-white p-4 text-gray-600">
                                        <p className="text-sm font-medium">Meet Max, a lovable Labrador mix who spent most of his life in a shelter waiting for his forever home. Max had a rough start in life and was overlooked by....</p>
                                      </blockquote>
                                    </div>
                                    </Slide>
                                   
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 bg-gray-950 text-white px-2 py-3 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" id="next">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
