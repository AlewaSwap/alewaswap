// context/AleoContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { AleoAccount } from '@aleohq/sdk';

interface AleoContextProps {
  account: AleoAccount;
  trade: (pair: string, amount: string) => Promise<any>;
  getBalance: (address: string) => Promise<string>;
}

const AleoContext = createContext<AleoContextProps | undefined>(undefined);

export const useAleo = () => {
  const context = useContext(AleoContext);
  if (!context) {
    throw new Error('useAleo must be used within an AleoProvider');
  }
  return context;
};

export const AleoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const account = ... // Your logic to get the Aleo account
  const trade = async (pair: string, amount: string) => {
    // Your logic to perform trade on Aleo
  };

  const getBalance = async (address: string) => {
    // Your logic to get the balance from Aleo
    return "0"; // Example balance
  };

  return (
    <AleoContext.Provider value={{ account, trade, getBalance }}>
      {children}
    </AleoContext.Provider>
  );
};
