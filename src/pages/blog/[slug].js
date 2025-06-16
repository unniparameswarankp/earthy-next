// pages/blog/[slug].js

import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { slug } = params;

const query = `*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  publishedAt,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  body
}`;


  const post = await client.fetch(query, { slug });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
}
const BlogDetail = ({ post }) => {
  return (
    <div className="blog-detail container">
      <h1>{post.title}</h1>
      {/* <p className="date">{new Date(post.publishedAt).toDateString()}</p> */}
      
      {post.mainImage && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.title}
          width={1200}
          height={600}
          className="featured-image"
        />
      )}

      <div className="content">
        <PortableText value={post.body} />
      </div>
    </div>
  );
};

export default BlogDetail;
