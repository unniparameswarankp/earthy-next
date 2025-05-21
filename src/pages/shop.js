// pages/shop.js

import Image from 'next/image';
import Link from 'next/link';
import iconImage from '../assets/images/icon.png';
import ProductImage from '../assets/images/product.png';
import { client } from '@/lib/sanity'; // adjust path if needed
import { urlFor } from '@/lib/image'; 

export async function getServerSideProps() {
  // Fetch all products and their categories
  const productsQuery = `*[_type == "product"]{
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

const Shop = ({ products, categories }) => {

  
  return (
    <div  className='bk-product-list-page'>
        <div className='bk-product-listing-banner'>
            <div className='container'>
            <h1>Our Products</h1>
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
        <ul className='category-listing'>
            {/* 
            <li><Link href="/category/chemical">Chemical</Link></li>
            <li><Link href="/category/compostable-bags">Compostable Bags</Link></li>
            <li><Link href="/category/heavy-duty-wipes">Heavy Duty Wipes</Link></li>
            <li><Link href="/category/rolls">Rolls</Link></li>
            <li><Link href="/category/urinal-screen">Urinal Screen</Link></li> */}
            <li><Link className='active' href="/shop">All Products</Link></li>
            {categories.map(cat => (
            <li key={cat._id}>
              {cat.slug?.current ? (
                <Link href={`/category/${cat.slug.current}`}>
                  {cat.title}
                </Link>
              ) : (
                <span>{cat.title}</span>
              )}
            </li>
          ))}

        </ul>
        <div className='row'>
            {products.map(prod => (
            <div key={prod._id} className='col-md-6 col-12 pb-30'>
                             <div className="bk-product-listing">
                              <svg xmlns='http://www.w3.org/2000/svg' width='295.401' height='409.001' viewBox='0 0 295.401 409.001'><path id='Intersezione_1' data-name='Intersezione 1' d='M-9121,1999q-.388,0-.774-.01A30,30,0,0,1-9151,1969V1620a30,30,0,0,1,30-30h184.706c62.645,67.685,88.677,165.5,78.581,206.023-9.7,38.927-88.364,140.017-192.271,202.978Z' transform='translate(9151 -1589.999)' fill='#fffcd2'/></svg>
                                <div className="row">
                                  <div className="col-12 col-md-5">
                                     <figure>
                                        {prod.image && <img src={urlFor(prod.image).width(200).url()} alt={prod.title} />}
                                     </figure>
                                  </div>
                                  <div className="col-12 col-md-7">
                                    
                                     <div className="name">{prod.title}</div>
                                     <div className="category">{new Intl.NumberFormat('en-NZ', {
                                                             style: 'currency',
                                                             currency: 'NZD'
                                                           }).format(prod.price)}</div>
                                     <Link href={`/product/${prod.slug.current}`} className="btn-1 green" tabindex="0">View Product<svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025"><path id="arrow" d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16581.229 9977.23)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2"></path></svg></Link>
                                  </div>
                                </div>
                              </div>
            </div>
            ))}
        </div>
       </div>
    </div>
  );
};
export default Shop;


