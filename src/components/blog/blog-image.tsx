// import Image, { type ImageProps } from "next/image"

// export function BlogImage({
//   className,
//   alt,
//   width,
//   height,
//   ...props
// }: ImageProps) {
//   console.log({ width, height, props })

//   return (
//     <figure className='my-10'>
//       <Image
//         {...props}
//         alt={alt}
//         width={width}
//         height={height}
//         className={`h-auto w-full rounded-xl ${className ?? ""}`}
//       />

//       {alt && (
//         <figcaption className='mt-3 text-center text-sm text-muted-foreground'>
//           {alt}
//         </figcaption>
//       )}
//     </figure>
//   )
// }

// ------

import Image, { type ImageProps } from "next/image"

type BlogImageProps = Omit<ImageProps, "width" | "height"> & {
  width?: number
  height?: number
}

export function BlogImage({
  width = 1400,
  height = 800,
  className,
  alt,
  ...props
}: BlogImageProps) {
  return (
    <figure className='my-10'>
      <Image
        {...props}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto w-full rounded-xl ${className ?? ""}`}
      />

      {alt && (
        <figcaption className='mt-3 text-center text-sm text-muted-foreground'>
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
