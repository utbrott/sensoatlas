import { IconType } from 'react-icons/lib';

type HeaderItem = {
  type: 'header';
};

type LinkItem = {
  type: 'link';
  icon: IconType;
  href: string;
};

type LinkChildItem = {
  type: 'linkChild';
  href: string;
};

type ItemTypeProps = HeaderItem | LinkItem | LinkChildItem;

export type NavItem = ItemTypeProps & {
  label: string;
};
