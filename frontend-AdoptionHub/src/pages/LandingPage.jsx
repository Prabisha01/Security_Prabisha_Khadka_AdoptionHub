import { CircularProgress } from "@mui/material";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  
  contactApi,

  
} from "../apis/Api";
import useAuthCheck from "../components/IsAuthenticated";


const LandingPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const verifyAuthBeforeAction = useAuthCheck();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("contactName", fullName.trim());
    data.append("contactEmail", email.trim());
    data.append("contactMessage", message.trim());

    setIsLoading(true);

    contactApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          
          setFullName("");
          setEmail("");
          setMessage("");
        } else {
          toast.error(res.data.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Server Error: " + err.message);
      });
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openShareModal = () => {
    verifyAuthBeforeAction(() => {
      setIsShareModalOpen(true);
    });
  };




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
            className="absolute bottom-40 right-0 p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow"
            style={{ border: "solid" }}
          >
            <div className="flex justify-between w-96 text-center">
              <div>
                <div className="font-bold text-3xl">2</div>
                <div className="text-3xl">Adopted</div>
              </div>
              <div>
                <div className="font-bold text-3xl">7</div>
                <div className="text-3xl">Waiting</div>
              </div>
              <div>
                <div className="font-bold text-3xl">20</div>
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
              <span className="text-[#FF8534]">Furry Friend</span> into a{" "}
              <br className="hidden md:inline" />
              Loving Home Today
            </h1>
            <p className="mt-4 text-left">
              Discover the Joy of Adopting a Pet and Transforming Your Life with
              Unconditional Love
            </p>
            <div className="flex justify-center md:justify-end mt-8">
              <Link
                to={"/adopt"}
                className="bg-[#FF8534] text-center text-white font-bold text-xl w-full md:w-auto md:text-2xl px-16 py-2 md:py-2 lg:py-2 rounded"
                style={{
                  transition: "background-color 500ms ease, border 500ms ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                Adopt
              </Link>
            </div>
          </div>
        </div>
        </div>

    


        <div
          className="md:!mx-[13rem] lg:mx-80 m-5 md:p-20 rounded-lg mb-8"
          style={{
            backgroundImage: "url('assets/images/landingpage.png')",
            width: "1300px",
            height: "338px",
          }}
        >
          <div className="bg-white flex flex-col md:flex-row md:p-8 md:mx-8 border border-black items-center gap-6 md:gap- justify-center">
            <form className="space-y-4 w-full">
              <h1 className="font-bold text-5xl">
                Get In <span className="text-[#FF8534]">Touch</span>
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="w-full pl-4 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    color: "black",
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  className="w-full pl-4 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    color: "black",
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="w-full p-2 border-2 border-gray-800 rounded-md focus:border-[#FF8534]"
                  style={{
                    color: "black",
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={handleContactSubmit}
                className="bg-[#FF8534] text-white font-bold py-3 px-4 rounded-md"
                style={{
                  width: "431px", // Matching the width of the message field
                  fontSize: "22px",
                  fontWeight: "800",
                  transition: "background-color 500ms ease, border 500ms ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                {isLoading ? (
                  <CircularProgress color={"inherit"} size={20} />
                ) : (
                  "Send"
                )}
              </button>
            </form>
            <div className="w-full" style={{ padding: 0 }}>
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
    </>
  );
};

export default LandingPage;
