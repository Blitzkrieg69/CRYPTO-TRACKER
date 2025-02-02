import React, { useState, useEffect, useContext } from 'react';
import './Coin.css'; // Make sure this file exists
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext'; // Correct path
import LineChart from '../../components/LineChart/LineChart'; // Correct path

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-6bbAjv2CSLBA4zJMj1W2mrA2' }, // Your API Key
    };

    try {
      const response = await fetch(`/api/coins/${coinId}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setCoinData(null);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-6bbAjv2CSLBA4zJMj1W2mrA2' }, // Your API Key
    };

    try {
      const response = await fetch(
        `/api/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=31`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setHistoricalData(null);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]); // Important: Add coinId

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "N/A";
    }
    if (price < 0.001) {
      return price.toFixed(6);
    } else {
      return price.toLocaleString();
    }
  };

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart
            historicalData={historicalData}
            priceChange24h={coinData.market_data.price_change_percentage_24h}
          />
        </div>

        <div className="coin-info">
          <ul>
            <li>Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Price</li>
            <li>
              {currency.symbol} {formatPrice(coinData.market_data.current_price[currency.name])}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
            {currency.symbol} {formatPrice(coinData.market_data.high_24h[currency.name])}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
            {currency.symbol} {formatPrice(coinData.market_data.low_24h[currency.name])}
            </li>
          </ul>
          <ul>
            <li>24 Hour Change</li>
            <li className={coinData.market_data.price_change_percentage_24h >= 0 ? 'green' : 'red'}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;