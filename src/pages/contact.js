import Head from 'next/head';
import { useState } from 'react';
import iconImage from '../assets/images/icon.png'; 

export default function Contact() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // Send form data to an API route (or external service)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
      <div  className='bk-product-list-page'>
           <div className='bk-product-listing-banner'>
               <div className='container'>
               <h1>Contact Us</h1>
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
          <div className='container'>
            <div className='bk-contact'>
                <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
           <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button className='btn-1 green ' type="submit">Send Message</button>
        </form>
        {status && <p>{status}</p>}
            </div>
          </div>

     </div>
  );
}
