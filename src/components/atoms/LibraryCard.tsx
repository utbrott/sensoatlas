import { Card } from '@ui/Card'
import { LaboratoryProps } from '@data/labs-library'

export interface LibraryCardProps extends LaboratoryProps {
  category: string
}

export const LibraryCard = ({
  category,
  name,
  description,
  href
}: LibraryCardProps) => {
  return (
    <div className='w-min rounded-md bg-gray-100 shadow transition-transform hover:scale-105 hover:outline hover:outline-1 hover:outline-blue-500 dark:bg-gray-800/70 dark:hover:outline-blue-400'>
      <Card
        category={category}
        title={name}
        description={description}
        redirects={{
          buttonLabel: 'Start laboratory',
          href: `/laboratories/${category}${href}`
        }}
      />
    </div>
  )
}
