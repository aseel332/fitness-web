import { useState, useEffect } from "react";
import AnimatedText from "./components/AnimatedText";
import ImageCarousel from "./components/ImageCarousel";
import GymSections from "./components/GymSections";
import AnimatedServiceCard from "./components/AnimatedServiceCard";
import BookingModal from "./components/BookingModal";


export default function App(){
  const [showScroll, setShowScroll] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const booking = JSON.parse(localStorage.getItem("booking"));
  useEffect(() => {
    const timeout =setTimeout(() =>{
      setShowScroll(true);
    }, 1200)
    return () => clearTimeout(timeout);
  },)

  useEffect(() => {
    function checkDateTime(dateStr, timeStr) {
      const targetDateTime = new Date(`${dateStr}T${timeStr}:00`);
      const now = new Date();
      if (now > targetDateTime) {
        localStorage.removeItem("booking");
      }
      return;
    }
    if(booking){
      checkDateTime(booking.date, booking.time);
      return;
    }
  })
  return(
    <>
      {showBooking && <BookingModal isOpen={showBooking} onClose={() => {setShowBooking(false)}} />}
      <div className="video-background-container h-[100vh] sm:h-[80vh] md:h-screen lg:h-screen ">
        <video  autoPlay muted loop playsInline className="video-bg">
   
        <source src="/GYM_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.

        </video>
      <header className="flex flex-wrap justify-between text-white items-center  p-2 md:p-4 lg:p-5">
        <h1 className="logo-text mt-2 font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl">FITNESS18</h1>
        <div className="flex items-center gap-4 text-base sm:text-lg sm:gap-4 md:gap-6 md:text-xl font-semibold md:px-4 w-fit">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#contact" className="hover:underline">Contact Us</a>

          <button className="opacity-0 bg-black shadow-custom py-2 px-2 md:py-3 md:px-5 rounded-full">Book A Tour</button>
          <button className=" fixed top-4 right-2 md:top-6 md:right-6 z-50 bg-black shadow-custom py-2 px-4 md:py-3 md:px-5 rounded-full" onClick={() => {
            setShowBooking(true);
          }}>{booking ? " Slot Booked" : "Book A Tour"}</button>
        </div>
      </header>
      <section className="grid md:grid-cols-2 text-white mt-30 md:mt-30 gap-y-40 p-2 md:p-4 lg:p-5">
        <div className="flex flex-col gap-0.2 md:gap-2 quote-text text-3xl md:text-3xl lg:text-4xl text-neutral-500 mb-8">
          <AnimatedText />
        </div>
        <div className={`flex flex-col justify-center gap-1 mt-20 md:mt-0 transition-opacity duration-700 ${
          showScroll ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="w-full text-xs md:text-sm mx-auto text-center button-text">Scroll For More</p>
          <div className="h-[120px] md:h-[150px] w-[3px] mx-auto bg-gradient-to-b from-white to-transparent rounded-full"></div>
        </div>
      </section>
      </div>
      <section className="text-white p-2 md:p-4 lg:p-5">
        <div className="h-[1px] w-full bg-neutral-300 rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[810px] md:min-h-[550px] py-6 gap-6 md:gap-12">
          <GymSections />
          </div>
        <div className="h-[1px] w-full bg-neutral-300 rounded-full "></div>
      </section>
      <section id="services" className="py-4 px-5 text-white" >
        <h1 className="heading-text text-3xl md:text-5xl">Services</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-14 md:gap-x-12 min-h-[300px] md:min-h-[250px] mt-4 py-8 box">
          <AnimatedServiceCard delay={0}>
            <div className="rounded-2xl border-2 border-solid bg-[#0E0E0E] border-[#49155A] shadow-custom-p h-full">
              <div className="flex justify-center mx-auto bg-[#0E0E0E] rounded-2xl z-10 -mt-10 border-2 border-solid border-[#49155A] w-fit px-2 md:px-4 py-0 h-fit">
                <img className="max-w-[60px] md:h-[70px]" src="/pt.png" />
              </div>
              <div className="py-1 md:py-2 lg:py-3 md:px-4 px-2">
                <h1 className="heading-text text-lg md:text-3xl text-[#49155A]">PERSONAL TRAINING</h1>
                <p className="paragraph-text text-xs md:text-sm md:mt-1">Our personal training program offers one-on-one guidance tailored to your goals — whether it’s fat loss, muscle gain, or overall fitness.</p>
              </div>
            </div>
          </AnimatedServiceCard>

          <AnimatedServiceCard delay={0.1}>
            <div className="rounded-2xl border-2 border-solid bg-[#0E0E0E] border-[#155A24] shadow-custom-g h-full">
              <div className="flex justify-center mx-auto bg-[#0E0E0E] rounded-2xl z-10 -mt-10 border-2 border-solid border-[#155A24] w-fit px-2 md:px-4 py-0 h-fit">
                <img className="max-w-[60px] md:h-[70px] md:max-w-[83px]" src="/dt.png" />
              </div>
              <div className="py-1 md:py-2 lg:py-3 md:px-4 px-2">
                <h1 className="heading-text text-lg md:text-3xl text-[#155A24]">DIETITION</h1>
                <p className="paragraph-text text-xs md:text-sm md:mt-1">Get tailored nutrition plans that align with your training and lifestyle goals from certified dietitians.</p>
              </div>
            </div>
          </AnimatedServiceCard>

          <AnimatedServiceCard delay={0.2}>
            <div className="rounded-2xl border-2 border-solid bg-[#0E0E0E] border-[#665E12] shadow-custom-y h-full">
              <div className="flex justify-center mx-auto bg-[#0E0E0E] rounded-2xl z-10 -mt-10 border-2 border-solid border-[#665E12] w-fit px-4 py-0 h-fit">
                <img className="max-w-[60px] md:h-[70px]" src="/bca.png" />
              </div>
              <div className="py-1 md:py-2 lg:py-3 md:px-4 px-2">
                <h1 className="heading-text text-lg md:text-3xl text-[#665E12]">B.C.A</h1>
                <p className="paragraph-text text-xs md:text-sm md:mt-1">Bio-Composition Analysis to track progress, muscle mass, fat percentage, and more, accurately.</p>
              </div>
            </div>
          </AnimatedServiceCard>

          <AnimatedServiceCard delay={0.3}>
            <div className="rounded-2xl border-2 border-solid bg-[#0E0E0E] border-[#08167C] shadow-custom-b h-full">
              <div className="flex justify-center mx-auto bg-[#0E0E0E] rounded-2xl z-10 -mt-10 border-2 border-solid border-[#08167C] w-fit px-4 py-0 h-fit">
                <img className="max-w-[60px] md:h-[70px]" src="/yoga.png" />
              </div>
              <div className="py-1 md:py-2 lg:py-3 md:px-4 px-2">
                <h1 className="heading-text text-lg md:text-3xl text-[#08167C]">YOGA</h1>
                <p className="paragraph-text text-xs md:text-sm md:mt-1">Enhance flexibility, reduce stress, and boost recovery through focused yoga sessions guided by professionals.</p>
              </div>
            </div>
          </AnimatedServiceCard>
        </div>
        <div className="h-[1px] w-full bg-neutral-300 rounded-full "></div>
      </section>
      <section id="about" className="py-4 px-5 text-white">
        <h1 className="heading-text text-3xl md:text-5xl">About Us</h1>
        <div className="bg-neutral-300 w-full min-h-[200px] md:min-h-[400px] mt-4 rounded-2xl"></div>
        <p className="paragrapht-text text-sm md:text-base mt-4">At our gym, we’re more than just a fitness center — we’re a supportive community that uplifts, motivates, and grows together. Whether you're here to build strength, improve your health, or simply feel better every day, you’ll find a welcoming space filled with positive energy and like-minded individuals. </p>
        <div className="h-[1px] w-full bg-neutral-300 rounded-full mt-8"></div>
      </section>
      <section id="contact" className="py-4 px-5 text-white">
        <h1 className="heading-text text-3xl md:text-5xl ">Contact Us</h1>
        <div className="grid grid-cols-2 min-h-[200px] mt-4 md:mt-8 gap-4 md:gap-12">
          <div className="h-full py-2">
            <h1 className="heading-text text-2xl md:text-4xl text-[#4F4F4F]">LOCATION</h1>
            <p className="paragraph-text text-xs md:text-base mt-1 md:mt-2">24 kameshwar twins bungalow, 4th & 5th Floor, Prabhudas Thakkar College Rd, beside KOMAL ENCLAVE, Narayan Nagar Society, Ranna Park, Paldi, Ahmedabad, Gujarat 380007</p>
            <p className="mt-2 md:mt-4 flex gap-1 items-center text-xs md:text-base">
              <img className="max-w-[20px] md:max-w-[30px]" src="/gps.png"/>
              <a href="https://www.google.com/maps/place/fitness+18/data=!4m2!3m1!1s0x395e8511f0d30c81:0xb4a55bfc19a72615?sa=X&ved=1t:242&ictx=111">Click to go to Maps</a></p>
          </div>
          <div className="h-full py-2 border-l border-white pl-2 md:pl-4">
            <h1 className="heading-text text-2xl md:text-4xl text-[#4F4F4F]">Contacts</h1>
            <p className="mt-4 flex gap-1 items-center text-xs md:text-base">
              <img className="max-w-[20px] md:max-w-[30px]" src="/phone.png"/>
              07486848484</p>
            <p className="mt-4 flex gap-1 items-center">
              <img className="max-w-[20px] md:max-w-[30px]" src="/email.png"/>
              fitness18@gmail.com</p>
          </div>
        </div>
      </section>
    </>
  )
}