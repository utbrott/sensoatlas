import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Temperature,
  Displacement,
  StrainGauge,
  Piezoelectric,
} from '#components/labs';

const Laboratories = () => {
  const router = useRouter();
  const { lab } = router.query;

  let titleString = lab?.toString().replace(/([A-Z])/g, ' $1');
  const title = `
    ${titleString?.charAt(0).toUpperCase()}${titleString?.slice(1)}
  `;

  return (
    <>
      <Head>
        <title>Sensolab: {title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {lab === 'temperature' && <Temperature />}
      {lab === 'displacement' && <Displacement />}
      {lab === 'strain' && <StrainGauge />}
      {lab === 'piezoelectric' && <Piezoelectric />}
    </>
  );
};

export default Laboratories;
