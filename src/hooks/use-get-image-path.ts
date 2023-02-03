import { useRouter } from 'next/router';

interface UseGetImagePath {
  withExtension?: boolean;
}

export const useGetImagePath = ({ withExtension }) => {
  const router = useRouter();

  const strippedPath = router.asPath.replace('/laboratories', '');

  return `/schematics${strippedPath}${withExtension ? '.png' : ''}`;
};
