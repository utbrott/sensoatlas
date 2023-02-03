import Link from 'next/link';
import { useTheme } from 'next-themes';
import { AppIconGradient, AppIconPlain } from '@assets/logo/app-icon';
import { FacultyFull, FacultyIcon } from '@assets/logo/faculty-logo';

interface LogoProps {
  variant: 'full' | 'icon';
}

interface AppLogoProps extends LogoProps {
  withGradient?: boolean;
}

const AppLogo = ({ variant, withGradient }: AppLogoProps) => {
  const { theme } = useTheme();
  const logoBackground = theme === 'light' ? 'light' : 'dark';

  return (
    <Link href='/'>
      <div className='inline-flex max-w-fit cursor-pointer flex-row items-center gap-1'>
        {variant === 'full' ? (
          <>
            {withGradient ? (
              <AppIconGradient />
            ) : (
              <AppIconPlain background={logoBackground} />
            )}
            <div className='inline-flex select-none flex-row'>
              <p className='font-inter text-xl font-semibold'>senso</p>
              <p className='font-inter text-xl font-light'>atlas</p>
            </div>
          </>
        ) : withGradient ? (
          <AppIconGradient />
        ) : (
          <AppIconPlain background={logoBackground} />
        )}
      </div>
    </Link>
  );
};

interface FacultyLogoProps extends LogoProps {}

const FacultyLogo = ({ variant }: FacultyLogoProps) => {
  const { theme } = useTheme();
  const logoBackground = theme === 'light' ? 'light' : 'dark';

  return (
    <>
      {variant === 'full' ? (
        <FacultyFull background={logoBackground} />
      ) : (
        <FacultyIcon background={logoBackground} />
      )}
    </>
  );
};

export const Logo = Object.assign({ App: AppLogo, Faculty: FacultyLogo });
