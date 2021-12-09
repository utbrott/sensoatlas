import Head from 'next/head';
import { Hero } from '#components/hero';

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>SensoAtlas - Home</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Hero />
    </>
  );
};

export default IndexPage;
