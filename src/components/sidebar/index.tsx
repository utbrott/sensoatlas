import { VStack, List, ListItem } from '@chakra-ui/react';
import NavItem from './nav-item';
import { navItems } from '#data/sidebar';
import Logo from './logo';

const Sidebar = () => {
  return (
    <VStack align='flex-start' h='100vh' maxW={64} flexGrow={1} flexShrink={0} bg='gray.800'>
      <Logo />
      <List w='full' overflowY='auto'>
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <NavItem item={item} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Sidebar;
