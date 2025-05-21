// pages/about.js

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import iconImage from '../assets/images/icon.png';
import cleanerImage from '../assets/images/cleaner.jpg';



gsap.registerPlugin(ScrollTrigger);



const About = () => {

  const imageRef1 = useRef(null);
const imageRef2 = useRef(null);
const imageRef3 = useRef(null);
const imageRef4 = useRef(null);

    useEffect(() => {
    const anims = [
      { ref: imageRef1, y: -100 },
      { ref: imageRef2, y: -100 },
      { ref: imageRef3, y: -100 },
      { ref: imageRef4, y: -100 },
    ];

    anims.forEach(({ ref, y }) => {
      gsap.to(ref.current, {
        yPercent: y,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          scrub: true,
        },
      });
    });
  }, []);
  return (
    <div className="bk-about-page">



               


                <div  className='bk-product-list-page'>
                <div className='bk-product-listing-banner'>
                    <div className='container'>
                    <h1>About Us</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <span className='down'><svg class="next-arrow-circle mt-5 scroll-to" data-scroll-target="#our-products" data-offset="-150" xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="0 0 101 101">                         <g transform="translate(-910 -573)">                             <g transform="translate(968.568 563.5) rotate(90)">                             <path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" stroke-linecap="round" stroke-width="2"></path>                             </g>                             <g transform="translate(910 573)" fill="none" stroke="#3a5322" stroke-width="2">                             <circle cx="50.5" cy="50.5" r="50.5" stroke="none"></circle>                             <circle cx="50.5" cy="50.5" r="49.5" fill="none"></circle>                             </g>                         </g>                     </svg></span>
                    <img className='icon-bg icon-1' src={iconImage.src} />
                    <img className='icon-bg icon-3' src={iconImage.src} />
                    <img className='icon-bg icon-5' src={iconImage.src} />
                    <img className='icon-bg icon-6' src={iconImage.src} />
                    <img className='icon-bg icon-8' src={iconImage.src} />
                    <img className='icon-bg icon-9' src={iconImage.src} />
                    <img className='icon-bg icon-10' src={iconImage.src} />
                </div> 
                </div>




   






      <section className="bk-about-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-12">
              <figure ref={imageRef1}>
                <img src={cleanerImage.src} alt="Our Mission" className="img-fluid rounded shadow" />
              </figure>
            </div>
            <div className="col-md-5 col-12">
               <div className='text-bk'>
              <h2>Our Journey</h2>
              <p>Founded in 1954, NZ Cleaning Supplies began with a vision: to transform how New Zealanders approached cleaning and hygiene. What started as a small operation quickly gained a reputation for quality, reliability, and innovation.</p>
              <p>Today, we're proud to be at the forefront of the industry, offering solutions that combine performance with environmental responsibility. Over the decades, we've grown, adapted, and evolved, but our core mission remains the same: to empower businesses with cleaning solutions that are effective, efficient, and sustainable. </p>
              </div>
              <Link className="btn-1 green" href="/shop">
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>



     


     <section className="bk-about-content reverse-desktop">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-12">
              <figure ref={imageRef2}>
              <img src={cleanerImage.src} alt="Our Mission" className="img-fluid rounded shadow" />
              </figure>
            </div>
            <div className="col-md-5 col-12">
              <div className='text-bk'>
              <h2>Our Mission</h2>
              <p>
                At Earthy Environmental Solutions, we believe in sustainable cleaning. Our products are crafted to clean effectively while being safe for the environment. With years of research and a passion for eco-conscious living, we aim to revolutionize how people think about cleaning.
              </p>
              <p>
                We’re proud of our roots and dedicated to making a difference in every home and community we touch.
              </p>
              <Link className="btn-1 green" href="/shop">
                Explore Our Products
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className='bk-about-middle'>
       <div className="container">
        <img src={iconImage.src} />
           <h2> Let's Build <span>Cleaner</span>, Safer Spaces Together</h2>
           <p>At NZ Cleaning Supplies, we're not just selling cleaning products—we're creating a cleaner, healthier, and more sustainable future for New Zealand businesses. Whether you're a small business or a nationwide enterprise, we're here to empower you with the tools and expertise you need to succeed. </p>
       </div>
     </section>
     


        {/* <section className="bk-about-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-12">
              <figure ref={imageRef3}>
                <img src={cleanerImage.src} alt="Our Mission" className="img-fluid rounded shadow" />
              </figure>
            </div>
            <div className="col-md-5 col-12">
               <div className='text-bk'>
              <h2>Our Journey</h2>
              <p>Founded in 1954, NZ Cleaning Supplies began with a vision: to transform how New Zealanders approached cleaning and hygiene. What started as a small operation quickly gained a reputation for quality, reliability, and innovation.</p>
              <p>Today, we're proud to be at the forefront of the industry, offering solutions that combine performance with environmental responsibility. Over the decades, we've grown, adapted, and evolved, but our core mission remains the same: to empower businesses with cleaning solutions that are effective, efficient, and sustainable. </p>
              </div>
              <Link className="btn-1 green" href="/shop">
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section> */}



     


     {/* <section className="bk-about-content reverse-desktop">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-12">
              <figure ref={imageRef4}>
              <img src={cleanerImage.src} alt="Our Mission" className="img-fluid rounded shadow" />
              </figure>
            </div>
            <div className="col-md-5 col-12">
              <div className='text-bk'>
              <h2>Our Mission</h2>
              <p>
                At Earthy Environmental Solutions, we believe in sustainable cleaning. Our products are crafted to clean effectively while being safe for the environment. With years of research and a passion for eco-conscious living, we aim to revolutionize how people think about cleaning.
              </p>
              <p>
                We’re proud of our roots and dedicated to making a difference in every home and community we touch.
              </p>
              <Link className="btn-1 green" href="/shop">
                Explore Our Products
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}







    </div>
  );
};

export default About;
