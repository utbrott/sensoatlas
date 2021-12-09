import { Header } from '#components/header';
import { Subheader } from '#components/subheader';

export const Temperature = () => {
  return (
    <>
      <Header heading='Temperature sensors: RTD & Thermocouple' hasButton />
      <Subheader hasModal='Temperature sensors: RTD & Thermocouple' />
    </>
  );
};
