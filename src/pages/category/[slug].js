import { getAllCategorySlugs, getCategoryBySlug } from '../../lib/sanity';
import iconImage from '../../assets/images/icon.png'; 
import Link from 'next/link';
import { urlFor } from '../../lib/sanity';
import { useRouter } from 'next/router';





export default function CategoryPage({ category }) {
  const router = useRouter(); 
  const currentSlug = router.query.slug;

  if (!category) return <p>Loading...</p>; 

  return (
    
    <div  className='bk-product-list-page'>
        <div className='bk-product-listing-banner'>
            <div className='container'>
            <h1>{category.title}</h1>
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
            <li><Link  href="/shop">All Products</Link></li>
          {category.allCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className={cat.slug === currentSlug ? 'active' : ''}
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className='row'>
            {category.posts.map((post) => (
            <div key={post.slug.current} className='col-md-6 col-12 pb-30'>
                             <div className="bk-product-listing">
                              <svg xmlns='http://www.w3.org/2000/svg' width='295.401' height='409.001' viewBox='0 0 295.401 409.001'><path id='Intersezione_1' data-name='Intersezione 1' d='M-9121,1999q-.388,0-.774-.01A30,30,0,0,1-9151,1969V1620a30,30,0,0,1,30-30h184.706c62.645,67.685,88.677,165.5,78.581,206.023-9.7,38.927-88.364,140.017-192.271,202.978Z' transform='translate(9151 -1589.999)' fill='#fffcd2'/></svg>
                                <div className="row">
                                  <div className="col-12 col-md-5">
                                     <figure>
                                        <img
                                            src={urlFor(post.image).width(400).url()}
                                            alt={post.title}
                                        />
                                     </figure>
                                  </div>
                                  <div className="col-12 col-md-7">
                                     <div className="category">
                                  
                                     </div>
                                     <div className="name">{post.title}</div>
                                     <div className="category"> {typeof post.price === 'number'
    ? new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }).format(post.price)
    : 'Price not available'}</div>
                                     <Link href={`/product/${post.slug.current}`} className="btn-1 green" tabindex="0">View Product<svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025"><path id="arrow" d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16581.229 9977.23)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2"></path></svg></Link>
                                  </div>
                                </div>
                              </div>
            </div>
            ))}
        </div>
       </div>
    </div>
  );
}

// Pre-build paths for each category
export async function getStaticPaths() {
  const slugs = await getAllCategorySlugs();
  const paths = slugs.map((slug) => ({
    params: { slug: slug.slug },
  }));

  return {
    paths,
    fallback: true, // or false or 'blocking'
  };
}

// Fetch data for each category page
export async function getStaticProps({ params }) {
  const category = await getCategoryBySlug(params.slug);

  return {
    props: {
      category,
    },
    revalidate: 60, // ISR: rebuild every 60s
  };
}
