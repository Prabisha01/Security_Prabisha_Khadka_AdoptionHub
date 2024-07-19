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
    <div className="font-sans min-h-[120vh] text-gray-800 mt-24 mb-96"> {/* Added mb-96 for extra bottom margin */}
      <div className="container mx-auto px-4 pt-10 pb-20">
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
            className="w-full h-80 object-cover"
          />
          <div className="absolute shadow-2xl inset-0 top-[38rem] flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg border border-black w-[1100px] p-8">
              <div className="flex flex-row gap-6 mb-8">
                <img
                  src="assets/images/parrot.png"
                  className="h-[300px] w-[300px] rounded-lg"
                  alt="Parrot"
                />
                <div className="w-full">
                  <h1 className="font-bold text-4xl mb-4">
                    <span className="text-orange-400">Why</span> Donate?
                  </h1>
                  <p>
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
              <div className="mb-8">
                <h2 className="font-bold text-3xl mb-4">
                  <span className="text-orange-400">How</span> To Donate?
                </h2>
                <p className="mb-4">
                  To donate to pet adoption organizations, follow these simple
                  steps:
                </p>
                <ol className="list-decimal list-inside mb-4">
                  <li className="mb-2">
                    <strong>Visit the AdoptionHub Website:</strong> Go to the
                    official website of the pet adoption organization you wish
                    to support.
                  </li>
                  <li className="mb-2">
                    <strong>Click on the "Donate Now" Button:</strong> Look for
                    the "Donate Now" button, usually located prominently on the
                    homepage or in the donation section.
                  </li>
                  <li className="mb-2">
                    <strong>Fill out the Donation Form:</strong> Enter the
                    necessary information, including your name, contact details,
                    and payment information. You can usually choose a one-time
                    donation or set up a recurring contribution.
                  </li>
                  <li className="mb-2">
                    <strong>Select the Donation Amount:</strong> Choose the
                    amount you wish to donate. Many websites offer suggested
                    amounts, but you can often enter a custom amount as well.
                  </li>
                  <li className="mb-2">
                    <strong>Submit Your Donation:</strong> Review your
                    information and click the submit button to complete your
                    donation.
                  </li>
                </ol>
                <p className="mt-4">
                  Your generous contribution will go directly towards the
                  betterment of pets in need, funding essential services such as
                  food, medical care, spaying and neutering, and the operation
                  of shelters. Your support helps provide these animals with a
                  safe environment and increases their chances of finding a
                  loving forever home.
                </p>
              </div>
              <div className="text-right mb-10"> {/* Updated to text-right for right alignment */}
                <button
                  onClick={openForm}
                  className="bg-orange-500 text-white font-bold py-2 px-8 rounded transition duration-300 ease-in-out"
                  style={{ transition: 'background-color 500ms ease, border 500ms ease' }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FF7148";
                    e.target.style.border = "2px solid black";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#FF8534";
                    e.target.style.border = "none";
                  }}
                >
                  Donate Now
                </button>
              </div>
            </div>
            <DonateMoney isOpen={isFormOpen} onClose={closeForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyDonate;
