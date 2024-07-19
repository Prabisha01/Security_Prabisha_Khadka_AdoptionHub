import React, { useState } from "react";
import DonateMoney from "./user/DonateMoney";

const WhyDonate = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="font-sans min-h-[120vh] text-gray-800 mt-24">
      <div className="container mx-auto px-4 pt-10">
        <h1 className="text-4xl text-center font-bold mb-6">
          Empowering Happy Lives, One <br />{" "}
          <span className="text-orange-400"> Donation </span> at a Time.
        </h1>
        <p className="text-xl text-center mb-10">
          Your generous donation will enable us to provide top-notch care for{" "}
          <br /> our <span className="font-bold"> beloved </span> pets, ensuring
          they live happy, fulfilling lives.
        </p>
        <div className="relative">
          <img
            src={"assets/images/cat.png"}
            alt="Happy pets"
            className="w-full h-80 object-cover opacity-70  border-1 border-black"
          />
          <div className="absolute shadow-2xl inset-0 top-[38rem] flex flex-col justify-center items-center">
            <div className=" bg-white min-h-[800px] rounded-lg min-w-[1100px]">
              <div className="flex w-[1000px] flex-row gap-6 p-5 rounded-lg">
                <img
                  src="assets/images/parrot.png"
                  className="h-100 rounded-lg"
                />
                <div>
                  <h1 className="font-bold text-4xl">
                    <span className="text-orange-400">Why</span> Donate ?{" "}
                  </h1>
                  <p className="w-full">
                    Donating to pet adoption organizations is a powerful way to
                    make a difference in the lives of animals in need. These
                    donations support shelters and rescue groups that provide
                    essential care, medical treatment, and safe, loving
                    environments for abandoned and homeless pets. Financial
                    contributions help cover the costs of food, vaccinations,
                    spaying and neutering, and other veterinary services,
                    ensuring that animals are healthy and ready for adoption.
                    Moreover, donations enable these organizations to run
                    community outreach and education programs that promote
                    responsible pet ownership and reduce the number of animals
                    entering shelters.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-row justify-end py-10">
              <button
                onClick={openForm}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded transition duration-300 ease-in-out"
              >
                Donate Now
              </button>
              {isFormOpen && <DonateMoney onClose={closeForm} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDonate;
