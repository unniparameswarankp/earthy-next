// lib/image.js
import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
