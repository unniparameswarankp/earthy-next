import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import bannerImage from '../assets/images/banner.jpg'; 
import iconImage from '../assets/images/icon.png'; 
import cleaningImage from '../assets/images/cleaning.jpg'; 
import cleanerImage from '../assets/images/cleaner.jpg'; 
import cleaningProductImage from '../assets/images/cleaning-products.png'; 
import ProductImage from '../assets/images/product.png';
import KiwyImage from '../assets/images/kiwy.png'; 
import HomeImage from '../assets/images/earthy-home.jpg'; 
import Image70 from '../assets/images/70-years.png'; 
import Imageroll from '../assets/images/toyletroll.jpeg'; 
import { client } from '@/lib/sanity' // or '../lib/sanity' if not using aliases
import { urlFor } from '@/lib/image' 
import bottleImage from '../assets/images/bottle.jpg'; 








export async function getStaticProps() {
  // Fetch all products and their categories
  const productsQuery = `*[_type == "product"][0...6]{
  _id,
  title,
  slug, // ✅ Add this line
  price,
  "categories": categories[]->{
    _id,
    title,
    slug
  },
  image
}`;


  const categoriesQuery = `*[_type == "category"]{
    _id,
    title,
    slug
  }`;

  const products = await client.fetch(productsQuery);
  const categories = await client.fetch(categoriesQuery);

  return {
    props: {
      products,
      categories,
    },
  };
} 




gsap.registerPlugin(ScrollTrigger);

const Home = ({ products }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const sideimgRef = useRef(null);
  const textHorizondalRef = useRef(null);
  const sideimgRef2 = useRef(null);
  const textRef2 = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const anims = [
      { ref: imageRef, y: -100 },
      { ref: textRef, y: -20 },
      { ref: sideimgRef, y: 50 },
      { ref: sideimgRef2, y: -50 },
      { ref: textRef2, y: 20 }
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

  useEffect(() => {
    gsap.fromTo(
      textHorizondalRef.current,
      { x: '40%' },
      {
        x: '-130%',
        ease: 'none',
        scrollTrigger: {
          trigger: textHorizondalRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, 
        },
      }
    );
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
    })
    .from(descRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
    }, '-=0.4')
  }, []);

  return (
    <>

      {/* Banner Section */}
      <section className="bk-home-banner">
        {/* <figure><img src={bannerImage.src} alt="Banner" /></figure> */}
        <video
          className="video-banner"
          src="/banner-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="container">
          <h1 >Tough on Dirt. Gentle on Nature.</h1>
          <p >Our eco-friendly cleaning products are powerful on stains yet kind to the environment. Made with biodegradable, plant-based ingredients, they deliver a deep clean without harsh chemicals. Safe for your family, pets, and the planet — it’s cleaning you can feel good about. Make the sustainable switch without compromising on performance.</p>
          <Link href="/shop" className="btn-1 green">
            View Shop
            <svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025"><g transform="translate(-56.271 1.23)"><path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" stroke-linecap="round" stroke-width="2"></path></g></svg>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bk-home-about">
        <div className="description-bk parallax-wrapper">
          <h2>About <span>Earthy</span> <small>Environmental Solutions</small></h2>
          <img ref={sideimgRef} className='kiwy-img' src={Image70.src} alt="" />
          <div className="row position-relative">
            <div className="col-md-4 col-12">
              <figure className="about-image">
                <img ref={imageRef} src={HomeImage.src} alt="Cleaning" />
              </figure>
            </div>
            <div className="col-md-8 col-12">
              <div className="text-bk">
                <div className="bubble-desktop">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155.519 989.7">
                    <path d="..." fill="#fff" />
                  </svg>
                </div> ̰
                <div className="wrap">
                  <div ref={textRef}>
                    <h6>For over 70 years, NZ Cleaning Supplies has been more than just a supplier—we've been a partner in cleanliness, innovation, and sustainability. </h6>
                    <div className="desc3">From government buildings to five-star hotels, we've powered spotless spaces with cutting-edge equipment and eco-friendly solutions. Our journey began with a simple goal: to redefine cleaning standards across New Zealand. Today, with 2000+ products, global partnerships, and a nationwide presence, we continue to push boundaries—one cleaning solution at a time. </div>
                  </div>
     
                  <img className='kiwy-img-2 d-md-none' src={Image70.src} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="payoff-wrapper">
        <div ref={textHorizondalRef}  className="payoff-text text-primary ogg-400">
        Tough on Dirt. <span className="text-secondary">Gentle on Nature.</span>
        </div>
      </div>
      <div className="home-video">
        <div className="container">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe src="https://player.vimeo.com/video/656958665?h=ad6920d100" className="_iub_cs_activate _iub_cs_activate-activated" data-iub-purposes="1" data-cmp-ab="2" data-cmp-info="8" async="false"></iframe>
          </div>
        </div>
      </div>

      <section className="bk-home-our-products">
        <div className="container">
          <header>
            <h2>Our Products</h2>
            <h6>Clean smarter. Live greener.</h6>
            <p> At NZ Cleaning Supplies, we don't just aim to meet expectations—we aim to exceed them. </p>
            <Link className="btn-1 green" href="/shop">View Shop<svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025"><g transform="translate(-56.271 1.23)"><path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" stroke-linecap="round" stroke-width="2"></path></g></svg></Link>
          </header>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}

            // Responsive breakpoints
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              575: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              769: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              993: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1300: {
                slidesPerView: 6,
                spaceBetween: 30,
              }
            }}
          >
            {/* Slides */}
            
            {products.map((product, index) => (
 <SwiperSlide key={product._id}>

              <div  className="bk-product-listing">
           
                     <figure>
                        {product.image && (
              <img src={urlFor(product.image).width(300).url()} alt={product.title} />
            )}
                     </figure>
               
                     
                     <div className="name">{product.title}</div>
                     <div className="category">
  {product.price != null
    ? new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }).format(product.price)
    : 'Price is not available'}
</div>
<Link href={`/product/${product.slug.current}`} className="btn-1 green" tabIndex={0}>
  View Product
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12.215"
    height="19.025"
    viewBox="0 0 12.215 19.025"
  >
    <path
      d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9"
      transform="translate(16581.229 9977.23)"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
</Link>   
               
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      <section className="bk-home-content-section position-relative">
        <div className="description-bk">
         <div className="row position-relative">
          <div className="col-md-8">
             <div ref={textRef2} className="text-bk">
                <svg className="bubble-desktop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155.519 989.7">                         <path id="bubble-01" d="M727.546,58.656c310.955,0,449.911,393.087,420.51,513.555s-406.925,561.318-765.145,461.58S-18.559,637.168-.059,417.165,416.591,58.656,727.546,58.656Z" transform="translate(3.614 -58.656)" fill="#fff"></path>                     </svg>
                <div className="wrap">
                  <h2>Eco-power in every drop.</h2>
                  <h5> At NZ Cleaning Supplies, we don't just aim to meet expectations—we aim to exceed them. </h5>
                  {/* <p>Every product we create or distribute reflects our commitment to a cleaner planet. From biodegradable chemicals to energy-efficient equipment, we lead the charge in eco-friendly innovation. We understand that no two businesses are the same. That's why we offer tailored products and services that fit seamlessly into your operations, boosting efficiency and results. </p> */}
                  <Link className="btn-1 green" href="/about">About Us<svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025"><g transform="translate(-56.271 1.23)"><path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" stroke-linecap="round" stroke-width="2"></path></g></svg></Link>
                </div>
             </div>
          </div>
          <div className="col-md-4">
           <figure>
             <img ref={sideimgRef2} src={cleanerImage.src}/>
           </figure>
          </div>
          </div>
        </div>
        <img className="icon-leaf-float icon-leaf-3" src={iconImage.src} alt="Leaf Icon" />
        <img className="icon-leaf-float icon-leaf-4" src={iconImage.src} alt="Leaf Icon" />
        <img className="icon-leaf-float icon-leaf-5" src={iconImage.src} alt="Leaf Icon" />
      </section>

      <section className='bk-home-not'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-5 col-12'>
              <figure>
                <img src={bottleImage.src}/>
              </figure>
            </div>
            <div className='col-md-7 col-12'>
              <h2>Our chemical Bottles Are Recycled</h2>
              <p>All our chemical bottles are responsibly recycled to minimize environmental impact. After use, they are thoroughly cleaned and sent to certified recycling facilities where they are processed according to industry standards. This practice helps reduce plastic waste, supports sustainability, and ensures compliance with environmental regulations. By recycling our chemical containers, we are committed to protecting the planet and promoting a greener future.</p>
            </div>
          </div>
        </div>
      </section>


      <section className='bk-home-product-highlight'>
        <div className='container'>
          <div className='row align-items-center flex-direction-md-reverce'>
            <div className='col-md-6 col-12'>
              <figure>
                  <img src={Imageroll.src} alt="Cleaning" />
              </figure>
            </div>
            <div className='col-md-6 col-12'>
              <div className='text-bk'>
              <div className='price'>Price is not available</div>
              <div className='title'>400 Sheets 2 PLY Toilet Roll</div>
              <div className='description'>
                <p>Earthy Toilet Tissue is a high-performance toilet paper designed for superior quality and comfort. Each roll is individually wrapped for added hygiene. This affordable 2-ply tissue offers excellent absorbency, while being both soft and durable.</p>
<ul>
                <li>Premium toilet paper with a quilted emboss for added comfort</li>

                <li>Individually wrapped rolls for enhanced hygiene</li>

                <li>Soft, strong, and highly absorbent</li>

                <li>2-ply tissue with high capacity and outstanding performance</li>

                <li>Packaged in a carton of 48 rolls, each containing 400 sheets</li>
                </ul>
                <Link className='btn-1 green' href="/product/400-sheets-2-ply-toilet-roll">View Product</Link>
</div>
                </div>
            </div>
          </div>
        </div>
      </section>


      <section className='bk-home-our-range'>
        <div className='left-container'>
          <div className='inner-bk'>
          <Swiper
            modules={[Navigation]}
            navigation
            pagination={{ clickable: true }}
            loop={true} 

            // Responsive breakpoints
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              575: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              769: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              993: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1025: {
                slidesPerView: 4,
                spaceBetween: 10,
              }
            }}
          >

            <SwiperSlide>
              <div className='item-bk'>
                <figure>
                  <img src={cleaningImage.src} />
                </figure>
                <span>Products</span>
                <h2>Chemical</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='item-bk'>
                <figure>
                  <img src={cleaningImage.src} />
                </figure>
                <span>Products</span>
                <h2>Compostable Bags</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='item-bk'>
                <figure>
                  <img src={cleaningImage.src} />
                </figure>
                <span>Products</span>
                <h2>Heavy Duty Wipes</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='item-bk'>
                <figure>
                  <img src={cleaningImage.src} />
                </figure>
                <span>Products</span>
                <h2>Rolls</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='item-bk'>
                <figure>
                  <img src={cleaningImage.src} />
                </figure>
                <span>Products</span>
                <h2>Urinal Screen</h2>
              </div>
            </SwiperSlide>
            

          </Swiper>
          </div>
        </div>
      </section>






      




    </>
  );
};

export default Home;