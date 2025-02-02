import { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: '$'
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-6bbAjv2CSLBA4zJMj1W2mrA2', // Replace with your actual API key if needed
      },
    };

    try {
      const response = await fetch(`/api/coins/markets?vs_currency=${currency.name}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
      // Important: Set a default value or handle the error gracefully
      setAllCoin([]); // Or some other default data if needed
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;