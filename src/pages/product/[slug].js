import { getProductBySlug } from '../../lib/sanity';
import { urlFor } from '../../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import ProductImageDummy from '../../assets/images/product.png';
import { useState, useEffect } from 'react';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const client = createClient({
  projectId: '9ixmdwm9',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: true,
});

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const product = await getProductBySlug(slug);
  const relatedProducts = await client.fetch(
    `*[_type == "product" && category == $category && slug.current != $slug][0...3]{
      _id,
      title,
      slug,
      price,
      image,
      pdfFile{
        asset->{
          url
        }
      }
    }`,
    { category: product.category, slug }
  );

  return {
    props: { product, relatedProducts }
  };
}

const schema = z.object({
  products: z.string(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export default function ProductDetails({ product, relatedProducts }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [mainProductQty, setMainProductQty] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur'
  });

  const [status, setStatus] = useState('');

  const openPopup = () => {
    setSelectedProducts([{ title: product.title, quantity: mainProductQty }]);
    setShowPopup(true);
  };

  const addProduct = (prod) => {
    setSelectedProducts((prev) => {
      if (prev.find(p => p.title === prod.title)) return prev;
      return [...prev, { title: prod.title, quantity: 1 }];
    });
  };

  const removeProduct = (prod) => {
    setSelectedProducts((prev) =>
      prev.filter(p => p.title !== prod.title)
    );
  };

  const increaseQty = (title) => {
    setSelectedProducts((prev) =>
      prev.map(p =>
        p.title === title ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQty = (title) => {
    setSelectedProducts((prev) =>
      prev.map(p =>
        p.title === title && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const getProductQuantity = (title) =>
    selectedProducts.find(p => p.title === title)?.quantity || 0;

  useEffect(() => {
    const productsString = selectedProducts
      .map(p => `${p.title} (x${p.quantity})`)
      .join(', ');
    setValue("products", productsString);
  }, [selectedProducts]);

  const onSubmit = async (data) => {
    setStatus('Sending...');
    try {
      const res = await fetch('/api/productEnquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('Message sent successfully!');
      } else {
        console.error('Server error:', result);
        setStatus(`Error: ${result.message || 'Something went wrong.'}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className='bk-product-detail'>
      {showPopup && (
        <div className='bk-product-popup'>
          <div className='inner-bk'>
            <button onClick={() => setShowPopup(false)} className='close'>×</button>
            <div className='row'>
              <div className='col-md-6 col-12'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Enquire Now</h2>
                  <label>Products</label>
                  <textarea {...register("products")} readOnly style={{ width: '100%', marginBottom: '1rem' }}></textarea>
                  <label>Name</label>
                  <input {...register("name")} placeholder="Your Name" style={{ width: '100%', marginBottom: '1rem' }} />
                  {errors.name && <p>{errors.name.message}</p>}
                  <label>Phone</label>
                  <input {...register("phone")} placeholder="Your Phone" style={{ width: '100%', marginBottom: '1rem' }} />
                  {errors.phone && <p>{errors.phone.message}</p>}
                  <label>Email</label>
                  <input {...register("email")} placeholder="Your Email" style={{ width: '100%', marginBottom: '1rem' }} />
                  {errors.email && <p>{errors.email.message}</p>}
                  <label>Message</label>
                  <textarea {...register("message")} placeholder="Message" style={{ width: '100%', marginBottom: '1rem' }}></textarea>
                  {errors.message && <p>{errors.message.message}</p>}
                  <button type="submit" className='btn-1 green' disabled={isSubmitting}>Submit</button>
                  {status && <p>{status}</p>}
                </form>
              </div>
              <div className='col-md-6 col-12'>
                <h2>Add more products</h2>
                {relatedProducts?.length > 0 && (
                  <ul>
                    {relatedProducts.map((prod) => {
                      const isSelected = selectedProducts.some(p => p.title === prod.title);
                      const qty = getProductQuantity(prod.title);
                      return (
                        <li key={prod._id}>
                          <img src={urlFor(prod.image).width(400).url()} alt={prod.title} />
                          <h5>{prod.title}</h5>
                          <p>{new Intl.NumberFormat('en-NZ', {
                            style: 'currency',
                            currency: 'NZD'
                          }).format(prod.price)}</p>
                          {isSelected ? (
                            <div className="qty-controls btn-1 green small">
                              <button onClick={() => decreaseQty(prod.title)}>-</button>
                              <span>{qty}</span>
                              <button onClick={() => increaseQty(prod.title)}>+</button>
                              <button onClick={() => removeProduct(prod)}>Remove</button>
                            </div>
                          ) : (
                            <button className='btn-1 green small' onClick={() => addProduct(prod)}>Add</button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 col-12">
            {product.image && (
              <img
                src={urlFor(product.image).width(500).url()}
                alt={product.title}
                style={{ borderRadius: '10px' }}
              />
            )}
          </div>
          <div className="col-md-6 col-12">
            <div className='text-bk'>
              <div className='sub-title-bk'>Product</div>
              <h1>{product.title}</h1>
              <p className="price-bk">{new Intl.NumberFormat('en-NZ', {
                                                             style: 'currency',
                                                             currency: 'NZD'
                                                           }).format(product.price)}</p>
              <div className='count-bk'>
              <button onClick={() => setMainProductQty(qty => Math.max(1, qty - 1))}>−</button>
              <span>{mainProductQty}</span>
              <button onClick={() => setMainProductQty(qty => qty + 1)}>+</button>
              </div>
              <button onClick={openPopup} className="btn-1 green">Enquire Now</button>
            </div>
          </div>
        </div>

        <div className='description-bk'>
          <h2>Product Details</h2>
          <PortableText value={product.description} />
        </div>
{product.pdfFile?.asset?.url && (
  <a
    href={product.pdfFile.asset.url}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-1 green small"
  >
    📄 Download Product PDF
  </a>
)}
{product.gallery && product.gallery.length > 0 && (
        <div className='gallery-bk'>
          <h2 className='text-center'>Gallery</h2>
          <Swiper
            modules={[Pagination]}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              769: { slidesPerView: 2, spaceBetween: 30 },
              993: { slidesPerView: 3, spaceBetween: 30 }
            }}
          >
            {product.gallery?.length > 0 && product.gallery.map((img, idx) => (
              <SwiperSlide key={idx}>
                <figure>
                  <img
                    src={urlFor(img).width(500).url()}
                    alt={`Gallery image ${idx + 1}`}
                    style={{ borderRadius: '10px' }}
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        )}
      </div>
    </div>
  );
}
