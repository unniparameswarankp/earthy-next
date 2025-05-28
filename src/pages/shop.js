import Link from 'next/link';
import iconImage from '../assets/images/leaf-icon.png';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';

const PRODUCTS_PER_PAGE = 6;

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || '1');
  const start = (page - 1) * PRODUCTS_PER_PAGE;

  const productsQuery = `*[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    slug,
    price,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    image
  }`;

  const totalCountQuery = `count(*[_type == "product"])`;
  const categoriesQuery = `*[_type == "category"]{
    _id,
    title,
    slug
  }`;

  const [allProducts, totalCount, categories] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(totalCountQuery),
    client.fetch(categoriesQuery),
  ]);

  // Move "chemical" category products to the top
  const reorderedProducts = [
    ...allProducts.filter(product =>
      product.categories?.some(cat => cat.title.toLowerCase() === 'chemical')
    ),
    ...allProducts.filter(product =>
      !product.categories?.some(cat => cat.title.toLowerCase() === 'chemical')
    ),
  ];

  // Paginate after reordering
  const products = reorderedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(reorderedProducts.length / PRODUCTS_PER_PAGE);

  return {
    props: {
      products,
      categories,
      totalPages,
      currentPage: page,
    },
  };
}

const Shop = ({ products, categories, totalPages, currentPage }) => {
  return (
    <div className="bk-product-list-page">
      <div className='bk-product-listing-banner'>
        <div className='container'>
          <h1>Our Products</h1>
          <p>Our cleaning chemicals are developed with biodegradable and non-toxic ingredients, ensuring they are safe for both users and the environment.</p>
        </div>
        <span className='down'>
          <svg className="next-arrow-circle mt-5 scroll-to" data-scroll-target="#our-products" data-offset="-150" xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="0 0 101 101">                         
            <g transform="translate(-910 -573)">                             
              <g transform="translate(968.568 563.5) rotate(90)">
                <path d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16637.5 9976)" fill="none" stroke="#3a5322" strokeLinecap="round" strokeWidth="2" />
              </g>                             
              <g transform="translate(910 573)" fill="none" stroke="#3a5322" strokeWidth="2">
                <circle cx="50.5" cy="50.5" r="50.5" stroke="none" />
                <circle cx="50.5" cy="50.5" r="49.5" fill="none" />
              </g>                         
            </g>                     
          </svg>
        </span>
        {/* Background icons */}
        <img className='icon-bg icon-1' src={iconImage.src} />
        <img className='icon-bg icon-3' src={iconImage.src} />
        <img className='icon-bg icon-5' src={iconImage.src} />
        <img className='icon-bg icon-6' src={iconImage.src} />
        <img className='icon-bg icon-8' src={iconImage.src} />
        <img className='icon-bg icon-9' src={iconImage.src} />
        <img className='icon-bg icon-10' src={iconImage.src} />
      </div> 

      <div className="container">
        <ul className="category-listing">
          <li>
            <Link className="active" href="/shop">All Products</Link>
          </li>
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link href={`/category/${cat.slug.current}`}>
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="row">
          {products.map((prod) => (
            <div key={prod._id} className="col-md-6 col-12 pb-30">
              <div className="bk-product-listing">
                <div className="row">
                  <div className="col-12 col-md-5">
                    <figure>
                      {prod.image && (
                        <img src={urlFor(prod.image).width(1200).url()} alt={prod.title} />
                      )}
                    </figure>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="name">{prod.title}</div>
                    <div className="category">
                      {prod.price != null
                        ? new Intl.NumberFormat('en-NZ', {
                            style: 'currency',
                            currency: 'NZD',
                          }).format(prod.price)
                        : 'Price is not available'}
                    </div>
                    <Link href={`/product/${prod.slug.current}`} className="btn-1 green">
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <Link
                key={pageNum}
                href={`/shop?page=${pageNum}`}
                className={pageNum === currentPage ? 'active' : ''}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
