import { client, urlFor } from '../../lib/sanity';
import iconImage from '../../assets/images/icon.png'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

const PRODUCTS_PER_PAGE = 6;

export default function CategoryPage({ category, currentPage, totalPages }) {
  const router = useRouter(); 
  const currentSlug = router.query.slug;

  if (!category) return <p>Loading...</p>; 

  return (
    <div className='bk-product-list-page'>
      <div className='bk-product-listing-banner'>
        <div className='container'>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
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
          <li><Link href="/shop">All Products</Link></li>
          {category.allCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
  href={`/category/${cat.slug.current}`}
  className={cat.slug.current === currentSlug ? 'active' : ''}
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
                        src={urlFor(post.image).width(1200).url()}
                        alt={post.title}
                      />
                    </figure>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="category"></div>
                    <div className="name">{post.title}</div>
                    <div className="category">
                      {typeof post.price === 'number'
                        ? new Intl.NumberFormat('en-NZ', {
                            style: 'currency',
                            currency: 'NZD',
                          }).format(post.price)
                        : 'Price not available'}
                    </div>
                    <Link href={`/product/${post.slug.current}`} className="btn-1 green" tabIndex="0">
                      View Product
                      <svg xmlns="http://www.w3.org/2000/svg" width="12.215" height="19.025" viewBox="0 0 12.215 19.025">
                        <path id="arrow" d="M-16580-9976a12.318,12.318,0,0,0,2.834,4.833,19.363,19.363,0,0,0,5.449,3.451,18.406,18.406,0,0,0-5.449,3.383,12.344,12.344,0,0,0-2.834,4.9" transform="translate(16581.229 9977.23)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <Link
                  key={pageNum}
                  href={`/category/${currentSlug}?page=${pageNum}`}
                  className={pageNum === currentPage ? 'active' : ''}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { slug } = context.params;
  const page = parseInt(context.query.page || '1');
  const start = (page - 1) * PRODUCTS_PER_PAGE;

  const categoryQuery = `
    *[_type == "category" && slug.current == $slug][0]{
      title,
      description,
      slug,
      "posts": *[_type == "product" && references(^._id)] | order(_createdAt desc) [${start}...${start + PRODUCTS_PER_PAGE}] {
        title,
        slug,
        price,
        image
      }
    }
  `;

  const countQuery = `
    count(*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)])
  `;

  const allCategoriesQuery = `
    *[_type == "category"]{
      title,
      description,
      slug
    }
  `;

  const [categoryData, totalCount, allCategories] = await Promise.all([
    client.fetch(categoryQuery, { slug }),
    client.fetch(countQuery, { slug }),
    client.fetch(allCategoriesQuery),
  ]);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  if (!categoryData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: {
        ...categoryData,
        posts: categoryData.posts || [],
        allCategories,
      },
      currentPage: page,
      totalPages,
    },
  };
}
