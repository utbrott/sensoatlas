import { default as NextImage } from 'next/image'

interface SchematicImageProps {
  imagePath: string
}

export const SchematicImage = ({ imagePath }: SchematicImageProps) => {
  return (
    <div className='relative mt-1 block h-80 w-80'>
      <NextImage
        src={imagePath}
        alt='schematic'
        fill
        priority
        sizes='33vw'
        className='rounded-md'
      />
    </div>
  )
}
