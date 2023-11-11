interface ParamTypes {
  src: string
  width: string
  quality: string
}

export default function myImageLoader({ src, width, quality }: ParamTypes) {
  return src.includes('dicebear')
    ? src
    : `${process.env.NEXT_PUBLIC_URL}${src}?w=${width}&q=${quality || 75}`
}
