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
        <Link
          href={link.href}
          className={`trasition-colors duration-50 -ml-px block border-l border-transparent pl-4 text-sm ease-in-out ${
            isActive
              ? 'cursor-default border-blue-500 font-semibold  text-blue-500'
              : 'text-gray-600 hover:border-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
          }`}
        >
          {link.label}
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
  return <nav className='mt-4 px-8 py-4'>{items}</nav>;
};
