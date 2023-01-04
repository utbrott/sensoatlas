import { VStack, List, ListItem, Box } from '@chakra-ui/react';
import NavItem from './nav-item';
import { navItems } from '@data/sidebar';
import { Logo } from '@components/logo';

const Sidebar = () => {
  return (
    <VStack
      align='flex-start'
      justify='justify-between'
      h='100vh'
      maxW={72}
      flexGrow={1}
      flexShrink={0}
      bg='gray.800'
    >
      <Logo.App />
      <Box h='full' w='full'>
        <List w='full' overflowY='auto'>
          {navItems.map((item) => (
            <ListItem key={item.label}>
              <NavItem item={item} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box p='4'>
        <Logo.Faculty />
      </Box>
    </VStack>
  );
};

export default Sidebar;
