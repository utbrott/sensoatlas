import Head from 'next/head';
import { LibraryGrid } from '#components/library-grid';

const Library = () => {
  return (
    <>
      <Head>
        <title>Sensolab - Library</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <LibraryGrid />
    </>
  );
};

export default Library;
