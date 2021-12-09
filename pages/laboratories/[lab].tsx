import Head from 'next/head';
import { useRouter } from 'next/router';
import { Temperature, Displacement, StrainGauge, Piezoelectric } from '#components/labs';
import { LabsProvider } from '#store/strain-provider';

const Laboratories = () => {
  const router = useRouter();
  const { lab } = router.query;

  return (
    <>
      <Head>
        <title>SensoAtlas - Laboratories</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <LabsProvider>
        {lab === 'temperature' && <Temperature />}
        {lab === 'displacement' && <Displacement />}
        {lab === 'strain' && <StrainGauge />}
        {lab === 'piezoelectric' && <Piezoelectric />}
      </LabsProvider>
    </>
  );
};

export default Laboratories;
