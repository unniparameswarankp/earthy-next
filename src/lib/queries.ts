// lib/queries.ts
export const getPageBySlug = (slug: string) => `
  *[_type == "page" && slug.current == "${slug}"][0]{
    title,
    content
  }
`;
