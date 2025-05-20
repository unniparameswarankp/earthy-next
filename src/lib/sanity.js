import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN, // Optional, only if you need secure reads
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}


// Get all category slugs
export async function getAllCategorySlugs() {
  return await client.fetch(`*[_type == "category"]{ "slug": slug.current }`);
}

// Get a category by slug
export async function getCategoryBySlug(slug) {
  return await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      title,
      description,
      "posts": *[_type == "product" && references(^._id)]{ title, slug, image, price },
      "allCategories": *[_type == "category"]{
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}



export async function getProductBySlug(slug) {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      title,
      description,
      price,
      slug,
      image {
        asset->{
          _id,
          url
        }
      },
      gallery[] {
        asset->{
          _id,
          url
        }
      },
      category->{
        title,
        slug
      }
    }`,
    { slug }
  );
}
