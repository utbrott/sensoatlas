import Link from 'next/link';
import { useRouter } from 'next/router';
import { navItems } from '@data/app-routes';

export interface NavItemProps {
  label: string;
  children?: { label: string; href: string }[];
}

export const NavItem = ({ label, children }: NavItemProps) => {
  const router = useRouter();
  const hasChildren = Array.isArray(children);

  const links = (hasChildren ? children : []).map(link => {
    const isActive = router.asPath === link.href ? true : false;

    return (
      <li key={link.label}>
        <Link href={link.href} passHref>
          <a
            className={`block pl-4 -ml-px text-sm border-l border-transparent trasition-colors ease-in-out duration-50 ${
              isActive
                ? 'border-sky-500 text-sky-500 font-medium cursor-default bg-sky-500/5'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:border-gray-500'
            }`}
          >
            {link.label}
          </a>
        </Link>
      </li>
    );
  });

  return (
    <div className='mb-4'>
      <div className='h-8 text-sm font-semibold'>{label}</div>
      <ul className='mb-4 space-y-1 border-l border-gray-300 dark:border-gray-700'>
        {links}
      </ul>
    </div>
  );
};

export const Navbar = () => {
  const items = navItems.map(item => <NavItem key={item.label} {...item} />);
  return <nav className='px-8 py-4'>{items}</nav>;
};
