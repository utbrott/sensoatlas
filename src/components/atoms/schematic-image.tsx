/* eslint-disable @next/next/no-img-element */

interface SchematicImageProps {
  imagePath: string;
}

export const SchematicImage = ({ imagePath }: SchematicImageProps) => {
  return (
    <div className='flex w-full items-center justify-center rounded-md bg-white px-2 py-4'>
      <img src={imagePath} alt='schematic' className='aspect-video h-full' />
    </div>
  );
};
