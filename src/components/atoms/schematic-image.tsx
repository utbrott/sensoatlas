import { default as NextImage } from 'next/image'
import { useRouter } from 'next/router'

interface SchematicImageProps {
  useStore: any
}

export const SchematicImage = ({ useStore }: SchematicImageProps) => {
  const router = useRouter()
  const labPath = router.asPath
  const fields = useStore((store: any) => store)

  function setImageSource(labPath: string) {
    const path = labPath.replace('/laboratories', '')

    if (labPath === '/laboratories/strain/strain-gauge') {
      const bridge = fields[0].bridge.name
      return `/assets/schematic${path}/${bridge.toLowerCase()}.png`
    }
    return `/assets/schematic${path}.png`
  }

  const imgSrc = setImageSource(labPath)

  return (
    <div className='relative block h-96'>
      <NextImage
        src={imgSrc}
        alt='schematic'
        fill
        priority
        sizes='33vw'
        className='rounded-md'
      />
    </div>
  )
}
