// pages/blog.js

import Link from 'next/link';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import iconImage from '../assets/images/leaf-icon.png'; 

export async function getServerSideProps() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...10]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  body
}`;

const blogQuery = `*[_type == "post"]{
  
}`;



  const blogs = await client.fetch(query);

  return {
    props: {
      blogs
    }
  };
}

// Utility function to extract plain text from portable text
function getExcerpt(body, maxLength = 200) {
  if (!body) return '';
  
  const plainText = body
    .map(block => block.children?.map(child => child.text).join('') || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + '...'
    : plainText;
}


export default function Blog({ blogs }) {
  return (
    <>
    <div  className='bk-product-list-page'>
                   <div className='bk-product-listing-banner'>
                       <div className='container'>
                       <h1>Blog</h1>
                       <p> Let's Build Cleaner, Safer Spaces Together </p>
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
                  <div className='container'></div>
             </div>
    <div className='bk-blog-listing'>
        
    <div className="container">
      <div className="row">
        {blogs.map(blog => (
          <div key={blog._id} className="col-lg-4 col-md-6 col-12 pb-50">
            <div className="blog-card">
              {blog.mainImage && (
                <img src={urlFor(blog.mainImage).width(400).url()} alt={blog.title} />
              )}
              <h3>{blog.title}</h3>
              <p>{getExcerpt(blog.body)}</p>
              <Link className='btn-1 green' href={`/blog/${blog.slug}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
}
