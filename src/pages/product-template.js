import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductImage from '../assets/images/product.png';

export default function ProductTemplate() {
  return (
    
    <div className='bk-product-detail'>
        <style>{`
        .swiper-pagination-bullet {
          background: url('/icon.png');
        }
      `}</style>
    <div className="container">
      
      <div className="row align-items-center">
        <div className="col-md-6 col-12">
          <Image
            src={ProductImage}
            alt="Kit Limited Edition"
            width={400}
            height={400}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 col-12">
        <div className='text-bk'>
         <div className='sub-title-bk'>Scopri la nuova annata!</div>
          <h1>Kit Limited Edition</h1>
          <p>Scegli tra <b>Prestigio, Tradizione ed Essenza:</b> tre proposte uniche per celebrare il Natale con gusto e autenticità!</p>
          <p>
            This is a special edition eco-friendly cleaning kit made with biodegradable
            materials. Perfect for homes and offices.
          </p>
          <p className="price-bk">Price: ₹499</p>
          <Link className="btn-1 green" href="#">Buy Now</Link>
        </div>
        </div>
      </div>

      <div className='description-bk'>
        <h2>Product Details</h2>
        <p>This is a special edition eco-friendly cleaning kit made with biodegradable materials. Perfect for homes and offices. This is a special edition eco-friendly cleaning kit made with biodegradable materials. Perfect for homes and offices. This is a special edition eco-friendly cleaning kit made with biodegradable materials. Perfect for homes and offices. This is a special edition eco-friendly cleaning kit made with biodegradable materials. Perfect for homes and offices.</p>
      </div>


      <div className='gallery-bk'>
        <h2 className='text-center'>Gallery</h2>
                  <Swiper
                    modules={[Pagination]}
                    navigation
                    pagination={{ clickable: true }}
        
                    // Responsive breakpoints
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      769: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                       993: {
                        slidesPerView: 3,
                        spaceBetween: 30,  
                      }
                    }}
                  >
                    <SwiperSlide>
                        <figure>
                            <Image
                                src={ProductImage}
                                alt="Kit Limited Edition"
                                width={400}
                                height={400}
                                className="img-fluid"
                            />
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                        <figure>
                            <Image
                                src={ProductImage}
                                alt="Kit Limited Edition"
                                width={400}
                                height={400}
                                className="img-fluid"
                            />
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                        <figure>
                            <Image
                                src={ProductImage}
                                alt="Kit Limited Edition"
                                width={400}
                                height={400}
                                className="img-fluid"
                            />
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                        <figure>
                            <Image
                                src={ProductImage}
                                alt="Kit Limited Edition"
                                width={400}
                                height={400}
                                className="img-fluid"
                            />
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide>
                        <figure>
                            <Image
                                src={ProductImage}
                                alt="Kit Limited Edition"
                                width={400}
                                height={400}
                                className="img-fluid"
                            />
                        </figure>
                    </SwiperSlide>
                  </Swiper>
      </div>


    </div>
    </div>
  );
}
