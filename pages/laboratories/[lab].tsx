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
        <title>Sensolab - Laboratories</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {lab === 'temperature' && <Temperature />}
      {lab === 'displacement' && <Displacement />}
      {lab === 'strain' && (
        <LabsProvider>
          <StrainGauge />
        </LabsProvider>
      )}
      {lab === 'piezoelectric' && <Piezoelectric />}
    </>
  );
};

export default Laboratories;
