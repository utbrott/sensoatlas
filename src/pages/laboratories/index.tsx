import { Shell } from '@ui/layouts';
import { library } from '@data/labs-library';
import { LibraryCard, libraryCardCreator } from '@atoms/library-card';

export default function Library() {
  const Cards = libraryCardCreator(library).map(card => {
    return (
      <LibraryCard
        category={card.category}
        name={card.name}
        description={card.description}
        href={card.href}
        key={card.href}
        disabled={card.disabled}
      />
    );
  });
  return (
    <Shell.App title='Library | SensoAtlas'>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 items-center justify-center gap-8'>
          {Cards}
        </div>
      </div>
    </Shell.App>
  );
}
