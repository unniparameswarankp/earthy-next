import Head from 'next/head';
import { useState } from 'react';
import iconImage from '../assets/images/icon.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('../../components/LocationMap'), {
  ssr: false,
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  phone: z.string().min(7, 'Phone number too short'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

export default function Contact() {
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        reset();
      } else {
        setStatus('Something went wrong.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="bk-product-list-page">
      <div className="bk-product-listing-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            At NZ Cleaning Supplies, we don't just aim to meet expectations—we aim to exceed them.
          </p>
        </div>
        <span className="down">
          <svg className="next-arrow-circle mt-5 scroll-to" data-scroll-target="#our-products" data-offset="-150" xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="0 0 101 101">
            <g transform="translate(-910 -573)">
              <g transform="translate(968.568 563.5) rotate(90)">
                <path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" strokeLinecap="round" strokeWidth="2"></path>
              </g>
              <g transform="translate(910 573)" fill="none" stroke="#3a5322" strokeWidth="2">
                <circle cx="50.5" cy="50.5" r="50.5" stroke="none"></circle>
                <circle cx="50.5" cy="50.5" r="49.5" fill="none"></circle>
              </g>
            </g>
          </svg>
        </span>
        <img className="icon-bg icon-1" src={iconImage.src} />
        <img className="icon-bg icon-3" src={iconImage.src} />
        <img className="icon-bg icon-5" src={iconImage.src} />
        <img className="icon-bg icon-6" src={iconImage.src} />
        <img className="icon-bg icon-8" src={iconImage.src} />
        <img className="icon-bg icon-9" src={iconImage.src} />
        <img className="icon-bg icon-10" src={iconImage.src} />
      </div>
      <div className="container">

      <div className='row align-items-center flex-direction-md-reverce'>

        <div className='col-md-6 col-12'>
          <div className="bk-contact">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              {...register('name')}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <input
              type="tel"
              placeholder="Your Phone"
              {...register('phone')}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <input
              type="email"
              placeholder="Your Email"
              {...register('email')}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <textarea
              placeholder="Your Message"
              rows="5"
              {...register('message')}
            />
            {errors.message && <p className="error">{errors.message.message}</p>}

            <button className="btn-1 green" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {status && <p>{status}</p>}
        </div>
        </div>
        <div className='col-md-6 col-12'>
<LocationMap />
        </div>

      </div>

<div className='container'>
      <div className='row mt-50'>
        <div className='col-md-4 col-12 mt-50'>
          <div className='green-box'>
          <h3 className='text-center color-primary'>Auckland Office</h3>
          <ul>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} />
8 Stanway Place, Ellerslie, Auckland 1051, New Zealand </li>
            <li><FontAwesomeIcon icon={faPhone} />0800 2 NZ CLEAN</li>
            <li><FontAwesomeIcon icon={faEnvelope} />nfo@cleaningsupplies.net.nz</li>
          </ul>
          </div>
        </div>
        <div className='col-md-4 col-12 mt-50'>
          <div className='green-box'>
          <h3 className='text-center color-primary'>Wellington Office</h3>
          <ul>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} />
34 Kaiwharawhara Road, Wellington 6035, New Zealand </li>
            <li><FontAwesomeIcon icon={faPhone} />0800 2 NZ CLEAN</li>
            <li><FontAwesomeIcon icon={faEnvelope} />info@cleaningsupplies.net.nz</li>
          </ul>
          </div>
        </div>
        <div className='col-md-4 col-12 mt-50'>
          <div className='green-box'>
          <h3 className='text-center color-primary'>Christchurch Office</h3>
          <ul>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} />Unit 4, 4-6 O'Brien's Road, Sockburn, Christchurch 8042, New Zealand </li>
            <li><FontAwesomeIcon icon={faPhone} />0800 2 NZ CLEAN</li>
            <li><FontAwesomeIcon icon={faEnvelope} />info@cleaningsupplies.nz</li>
          </ul>
          </div>
        </div>
      </div>

        </div>





      </div>
    </div>
  );
}
