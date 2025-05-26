import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router'; // ✅ Import useRouter
import logoImage from '../assets/images/logo.png'; 
import iconImage from '../assets/images/icon.png';
import menuImage from '../assets/images/menu-bg.jpg'; 

const Header = () => {
  const [atTop, setAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => setIsListOpen(!isListOpen);

  const router = useRouter(); // ✅ Define router

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);


  return (

     <>
     {isOpen && (
        <div className="bk-global-menu">
          <figure className='bg'>
            <img src={menuImage.src} />
          </figure>
          <div className='inner-bk'>
            <div className='container'>
             <ul className='menu-bk'>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/shop">Shop</Link>
              <button onClick={toggleList}><svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"/></svg></button>
              {isListOpen && (
              <ul className='sub-menu'>
                <li><Link className={router.pathname === '/category/chemical' ? 'active' : ''} href="/category/chemical">Chemical</Link></li>
                <li><Link className={router.pathname === '/category/compostable-bags' ? 'active' : ''} href="/category/compostable-bags">Compostable Bags</Link></li>
                <li><Link className={router.pathname === '/category/heavy-duty-wipes' ? 'active' : ''} href="/category/heavy-duty-wipes">Heavy Duty Wipes</Link></li>
                <li><Link className={router.pathname === '/category/rolls' ? 'active' : ''} href="/category/rolls">Rolls</Link></li>
                <li><Link className={router.pathname === '/category/urinal-screen' ? 'active' : ''} href="/category/urinal-screen">Urinal Screen</Link></li>
              </ul>
              )}
              </li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
             </ul>
             <div className='bottom-bk'>
              {/* <Link href="/contact" className='btn-1 white'>Contact Us <svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025">  <g id="Raggruppa_6941" data-name="Raggruppa 6941" transform="translate(-56.271 1.23)"><path id="Tracciato_13152" data-name="Tracciato 13152" d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" stroke-linecap="round" stroke-width="2"></path></g></svg></Link> */}
              <ul class="socials-bk"><li><a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="43.169" height="36.975" viewBox="0 0 43.169 36.975"><g transform="translate(-1383 -683.68)"><g transform="translate(1386.614 625.023)" fill="none"><path d="M23.7,58.656c11.617,0,16.808,14.685,15.71,19.186s-15.2,20.97-28.585,17.244-15-14.818-14.308-23.037S12.085,58.656,23.7,58.656Z" stroke="none"></path><path d="M 23.7018 59.6562 C 17.8844 59.6562 11.4228 60.9756 6.417 63.1857 C 0.9593 65.5952 -2.202 68.773 -2.4846 72.1337 C -2.9039 77.1202 -2.3031 81.392 -0.6988 84.8303 C 0.3014 86.974 1.7105 88.8157 3.4895 90.304 C 5.5124 91.9965 8.0712 93.2815 11.0947 94.1233 C 12.3042 94.4600 13.5708 94.6308 14.8594 94.6308 C 17.5059 94.6308 20.3131 93.9209 23.203 92.5208 C 25.7035 91.3094 28.2005 89.6208 30.6245 87.5021 C 35.3076 83.4087 38.0568 79.1766 38.4403 77.6052 C 38.7206 76.4568 38.4836 74.4082 37.8218 72.2589 C 37.0391 69.7169 35.74 67.2117 34.1638 65.2045 C 32.1761 62.6734 28.7476 59.6562 23.7018 59.6562 Z M 23.7018 58.6562 C 35.3189 58.6562 40.5102 73.3417 39.4118 77.8423 C 38.3134 82.3429 24.2094 98.8128 10.8265 95.0867 C -2.5564 91.3605 -4.1722 80.2691 -3.4811 72.0499 C -2.7899 63.8307 12.0847 58.6562 23.7018 58.6562 Z" stroke="none" fill="#e5ba5d"></path></g><path d="M12.381,12.654l.6-4.071H9.241V5.941a1.994,1.994,0,0,1,2.2-2.2h1.7V.275A19.85,19.85,0,0,0,10.12,0c-3.078,0-5.09,1.95-5.09,5.48v3.1H1.609v4.071H5.031V22.5H9.241V12.654Z" transform="translate(1397.212 690.919)" fill="#e5ba5d"></path></g></svg></a></li><li><a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="43.169" height="36.975" viewBox="0 0 43.169 36.975"><g id="insta" transform="translate(-1438 -683.68)"><g id="Tracciato_13154" data-name="Tracciato 13154" transform="translate(1441.614 625.023)" fill="none"><path d="M23.7,58.656c11.617,0,16.808,14.685,15.71,19.186s-15.2,20.97-28.585,17.244-15-14.818-14.308-23.037S12.085,58.656,23.7,58.656Z" stroke="none"></path><path d="M 23.7 59.656 C 17.884 59.656 11.423 60.976 6.417 63.186 C 0.959 65.595 -2.202 68.773 -2.485 72.134 C -2.904 77.12 -2.303 81.392 -0.699 84.83 C 0.301 86.974 1.711 88.816 3.49 90.304 C 5.512 91.996 8.071 93.281 11.095 94.123 C 12.304 94.46 13.571 94.631 14.859 94.631 C 17.506 94.631 20.313 93.921 23.203 92.521 C 25.704 91.309 28.2 89.621 30.624 87.502 C 35.308 83.409 38.057 79.177 38.44 77.605 C 38.721 76.457 38.484 74.408 37.822 72.259 C 37.039 69.717 35.74 67.212 34.164 65.205 C 32.176 62.673 28.748 59.656 23.7 59.656 Z M 23.7 58.656 C 35.319 58.656 40.51 73.342 39.412 77.842 C 38.313 82.343 24.209 98.813 10.826 95.087 C -2.556 91.361 -4.172 80.269 -3.481 72.05 C -2.79 63.831 12.085 58.656 23.7 58.656 Z" stroke="none" fill="#e5ba5d"></path></g><path id="Icon_awesome-instagram" data-name="Icon awesome-instagram" d="M11.248,7.718a5.768,5.768,0,1,0,5.768,5.768A5.759,5.759,0,0,0,11.248,7.718Zm0,9.517A3.75,3.75,0,1,1,15,13.486a3.757,3.757,0,0,1-3.75,3.75ZM18.6,7.482a1.345,1.345,0,1,1-1.345-1.345A1.342,1.342,0,0,1,18.6,7.482Zm3.82,1.365A6.658,6.658,0,0,0,20.6,4.134a6.7,6.7,0,0,0-4.714-1.817c-1.857-.105-7.424-.105-9.282,0A6.692,6.692,0,0,0,1.891,4.129,6.679,6.679,0,0,0,.074,8.842c-.105,1.857-.105,7.424,0,9.282a6.658,6.658,0,0,0,1.817,4.714A6.71,6.71,0,0,0,6.6,24.655c1.857.105,7.424.105,9.282,0A6.658,6.658,0,0,0,20.6,22.838a6.7,6.7,0,0,0,1.817-4.714c.105-1.857.105-7.419,0-9.277Zm-2.4,11.269a3.8,3.8,0,0,1-2.138,2.138c-1.481.587-4.995.452-6.631.452s-5.155.131-6.631-.452a3.8,3.8,0,0,1-2.138-2.138c-.587-1.481-.452-4.995-.452-6.631S1.9,8.33,2.478,6.855A3.8,3.8,0,0,1,4.617,4.716c1.481-.587,4.995-.452,6.631-.452s5.155-.131,6.631.452a3.8,3.8,0,0,1,2.138,2.138c.587,1.481.452,4.995.452,6.631S20.6,18.641,20.017,20.117Z" transform="translate(1448.34 688.682)" fill="#e5ba5d"></path></g></svg></a></li></ul>
             </div>
             </div>
          </div>
        </div>
      )}
    <header className={`bk-header position-relative  ${atTop ? '' : 'add-bg'} ${isOpen ? 'menu-opened' : ''}`}>
    <div className="container">
      <div className="left-bk">
        {/* <button className='menu-btn' onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <img src={iconImage.src} alt="" />
          <img src={iconImage.src} alt="" />
          <img src={iconImage.src} alt="" />
          <img src={iconImage.src} alt="" />
        </button> */}

   
        <button className='hamburger' onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul>
            <li><Link className={router.pathname === '/' ? 'active' : ''} href="/">Home</Link></li>
            <li><Link className={router.pathname === '/about' ? 'active' : ''} href="/about">About</Link></li>
            <li><Link className={router.pathname === '/shop' ? 'active' : ''} href="/shop">Products</Link>
            <ul className='sub-menu'>
              <li><Link className={router.pathname === '/category/chemical' ? 'active' : ''} href="/category/chemical">Chemical</Link></li>
              <li><Link className={router.pathname === '/category/compostable-bags' ? 'active' : ''} href="/category/compostable-bags">Compostable Bags</Link></li>
              <li><Link className={router.pathname === '/category/heavy-duty-wipes' ? 'active' : ''} href="/category/heavy-duty-wipes">Heavy Duty Wipes</Link></li>
              <li><Link className={router.pathname === '/category/rolls' ? 'active' : ''} href="/category/rolls">Rolls</Link></li>
              <li><Link className={router.pathname === '/category/urinal-screen' ? 'active' : ''} href="/category/urinal-screen">Urinal Screen</Link></li>
            </ul>
            </li>
            <li><Link className={router.pathname === '/blog' ? 'active' : ''} href="/blog">Blog</Link></li>
          </ul>
        </nav>

      </div>
      <Link className="logo-bk" href="/">
       <img src={logoImage.src} alt="Banner" />
      </Link>
      <div className="right-bk">
        {/* <a className="profile-link" href="#">
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" >
          <g id="Iconly/Curved/Profile">
          <g id="Profile">
          <path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd" d="M11.8445 21.6618C8.15273 21.6618 5 21.0873 5 18.7865C5 16.4858 8.13273 14.3618 11.8445 14.3618C15.5364 14.3618 18.6891 16.4652 18.6891 18.766C18.6891 21.0658 15.5564 21.6618 11.8445 21.6618Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M11.8372 11.1735C14.26 11.1735 16.2236 9.2099 16.2236 6.78718C16.2236 4.36445 14.26 2.3999 11.8372 2.3999C9.41452 2.3999 7.44998 4.36445 7.44998 6.78718C7.4418 9.20172 9.3918 11.1654 11.8063 11.1735C11.8172 11.1735 11.8272 11.1735 11.8372 11.1735Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </svg>
        </a>
        <a className="cart-link" href="#"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24896 2.29245C1.8582 2.15506 1.43005 2.36047 1.29266 2.75123C1.15527 3.142 1.36068 3.57015 1.75145 3.70754L2.01266 3.79937C2.68026 4.03409 3.11902 4.18964 3.44186 4.34805C3.74509 4.49683 3.87876 4.61726 3.96682 4.74612C4.05708 4.87821 4.12678 5.05963 4.16611 5.42298C4.20726 5.80319 4.20828 6.2984 4.20828 7.03835V9.75999C4.20828 11.2125 4.22191 12.2599 4.35897 13.0601C4.50529 13.9144 4.79742 14.526 5.34366 15.1022C5.93752 15.7285 6.69032 16.0012 7.58656 16.1283C8.44479 16.25 9.53464 16.25 10.8804 16.25L16.2861 16.25C17.0278 16.25 17.6518 16.25 18.1568 16.1882C18.6925 16.1227 19.1811 15.9793 19.6076 15.6318C20.0341 15.2842 20.2731 14.8346 20.4455 14.3232C20.6079 13.841 20.7339 13.2299 20.8836 12.5035L21.3925 10.0341L21.3935 10.0295L21.4039 9.97726C21.5686 9.15237 21.7071 8.45848 21.7416 7.90037C21.7777 7.31417 21.711 6.73616 21.3292 6.23977C21.0942 5.93435 20.7639 5.76144 20.4634 5.65586C20.1569 5.54817 19.8103 5.48587 19.4606 5.44677C18.7735 5.36997 17.9389 5.36998 17.1203 5.36999L5.66809 5.36999C5.6648 5.33324 5.66124 5.29709 5.6574 5.26156C5.60367 4.76518 5.48725 4.31246 5.20527 3.89982C4.92109 3.48396 4.54324 3.21762 4.10261 3.00142C3.69052 2.79922 3.16689 2.61514 2.55036 2.39841L2.24896 2.29245ZM5.70828 6.86999H17.089C17.9454 6.86999 18.6991 6.87099 19.2939 6.93748C19.5895 6.97052 19.8107 7.01642 19.9661 7.07104C20.0931 7.11568 20.1361 7.15213 20.1423 7.1574C20.1422 7.15729 20.1426 7.15762 20.1423 7.1574C20.2037 7.23881 20.2704 7.38651 20.2444 7.80796C20.217 8.25153 20.1005 8.84379 19.9229 9.73372L19.9225 9.73594L19.4237 12.1561C19.2623 12.9389 19.1537 13.4593 19.024 13.8441C18.9009 14.2095 18.7853 14.3669 18.66 14.469C18.5348 14.571 18.3573 14.6525 17.9746 14.6993C17.5714 14.7487 17.0399 14.75 16.2406 14.75H10.9377C9.5209 14.75 8.53783 14.7482 7.79716 14.6432C7.08235 14.5418 6.70473 14.3576 6.43219 14.0701C6.11202 13.7325 5.93933 13.4018 5.83744 12.8069C5.72628 12.1578 5.70828 11.249 5.70828 9.75999L5.70828 6.86999Z" fill="#1C274C"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5002 21.75C6.25756 21.75 5.2502 20.7426 5.2502 19.5C5.2502 18.2573 6.25756 17.25 7.5002 17.25C8.74285 17.25 9.7502 18.2573 9.7502 19.5C9.7502 20.7426 8.74285 21.75 7.5002 21.75ZM6.7502 19.5C6.7502 19.9142 7.08599 20.25 7.5002 20.25C7.91442 20.25 8.2502 19.9142 8.2502 19.5C8.2502 19.0858 7.91442 18.75 7.5002 18.75C7.08599 18.75 6.7502 19.0858 6.7502 19.5Z" fill="#1C274C"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5002 21.7501C15.2576 21.7501 14.2502 20.7427 14.2502 19.5001C14.2502 18.2574 15.2576 17.2501 16.5002 17.2501C17.7428 17.2501 18.7502 18.2574 18.7502 19.5001C18.7502 20.7427 17.7428 21.7501 16.5002 21.7501ZM15.7502 19.5001C15.7502 19.9143 16.086 20.2501 16.5002 20.2501C16.9144 20.2501 17.2502 19.9143 17.2502 19.5001C17.2502 19.0859 16.9144 18.7501 16.5002 18.7501C16.086 18.7501 15.7502 19.0859 15.7502 19.5001Z" fill="#1C274C"/>
        </svg></a> */}
        {/* <Link className="shop-link" href="/shop">SHOP</Link> */}
        <nav>
          <ul>
            
            <li><Link href="#"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z" fill="#0F0F0F"/>
</svg> <span>0800 2 NZ CLEAN</span></Link></li>
            <li><Link className="shop-link" href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <Link className="shop-link d-md-none d-inline-flex" href="/shop">Shop</Link>
      </div>
    </div>
  </header>
  </>
  );
};

export default Header;
