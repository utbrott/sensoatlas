import { StrainContext } from './strain-context';

type Props = {
  children: React.ReactNode;
};

export const StrainProvider = ({ children }: Props) => {
  const strainContext = {
    config: {
      metal: 'copper',
      inputVoltage: '5',
      resistance: '120',
      bridgeType: 'quater',
    },
  };

  return (
    <StrainContext.Provider value={strainContext}>
      {children}
    </StrainContext.Provider>
  );
};
