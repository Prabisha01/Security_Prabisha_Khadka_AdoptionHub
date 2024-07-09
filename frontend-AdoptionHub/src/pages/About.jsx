import React from "react";
import { FiX } from "react-icons/fi";

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mb-3 bg-gray-50">
      <img
        src="assets/images/terms.png"
        alt="Background"
        className="w-full h-64 object-fit"
      />
      <div className="bg-white mt-[-145px] p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button className="absolute top-4 right-4">
          <FiX className="text-gray-500" size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">About us</h2>
        <p className="text-lg mb-4">
          <strong>Welcome to AdoptionHub!</strong>
        </p>
        <p className="mb-4">
          At Adoption Hub, we believe every child deserves a loving and
          supportive home. We are dedicated to connecting prospective parents
          with children in need of a forever family, providing comprehensive
          support and guidance throughout the adoption journey.
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="mb-4">
          Our mission is to facilitate successful adoptions by offering
          compassionate, professional, and ethical services to both adoptive
          families and birth parents. We strive to ensure that every adoption is
          handled with the utmost care, respect, and dedication to the
          well-being of the child.
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Services</h3>
        <ul>
          <li>
            Adoption Counseling: We provide personalized counseling services to
            help prospective parents understand the adoption process, explore
            their options, and prepare for the journey ahead.
          </li>
          <li>
            Matching Services: Our team works diligently to match children with
            the right families, taking into consideration the needs and
            preferences of both the child and the adoptive parents.
          </li>
          <li>
            Legal Assistance: We offer comprehensive legal support to navigate
            the complex legalities of adoption, ensuring a smooth and compliant
            process.
          </li>
          <li>
            Post-Adoption Support: Our commitment doesn't end with the
            placement. We provide ongoing support and resources to help families
            adjust and thrive post-adoption.
          </li>
        </ul>
        <br />
        <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
        <ul class="list-disc pl-5">
          <li class="mb-1">
            Experience: With over 20 years in the field, our experienced team of
            adoption professionals has facilitated thousands of successful
            adoptions.
          </li>
          <li class="mb-1">
            Compassion: We approach every adoption with empathy and sensitivity,
            understanding the emotional journey that both adoptive families and
            birth parents undergo.
          </li>
          <li class="mb-1">
            Ethical Standards: We adhere to the highest ethical standards,
            ensuring that every step of the adoption process is transparent,
            fair, and in the best interest of the child.
          </li>
          <li class="mb-1">
            Support: From the initial consultation to post-adoption services, we
            are with you every step of the way, providing the support and
            guidance you need.
          </li>
        </ul>
        <br />
        <h3 className="text-xl font-semibold mb-2">Our Team</h3>
        <p className="mb-4">
          Our team is composed of dedicated professionals, including licensed
          social workers, counselors, legal experts, and support staff, all
          passionate about making a positive impact in the lives of children and
          families.
        </p>
      </div>
    </div>
  );
};

export default About;
