import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = allCoin ? allCoin.filter((item) => {
      const c = item.symbol.toLowerCase().includes(input.toLowerCase());
      const n = item.name.toLowerCase().includes(input.toLowerCase());
      return c || n;
    }) : [];

    setDisplayCoin(coins);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (allCoin) {
      setDisplayCoin(allCoin);
      setCurrentPage(1);
    }
  }, [allCoin]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = displayCoin ? displayCoin.slice(indexOfFirstCoin, indexOfLastCoin) : [];

  const totalPages = displayCoin ? Math.ceil(displayCoin.length / coinsPerPage) : 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Thy greens run long, thy red be none, with crypto, as it is with options.
          Give us Today our daily gains, and forgive us our losses, as we forgive those who short against us.
          And not lead us into margin call, but deliver us our tredies now until forever.<br /> AMEN.
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} type="text" placeholder='Search Crypto' />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Symbol</p>
          <p style={{ paddingLeft: 45 }}>Name</p>
          <p style={{ paddingLeft: 20 }}>Price</p>
          <p style={{ textAlign: "center" }}>24 Hr</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {currentCoins && currentCoins.length > 0 ? currentCoins.map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <>
              <p>{item.market_cap_rank}</p>
              <p style={{ paddingLeft: 10 }}>{item.symbol?.toUpperCase()}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <p>{currency.symbol} {formatPrice(item.current_price)}</p>
              <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className='market-cap'>{currency.symbol} {formatPrice(item.market_cap)}</p>
            </>
          </Link>
        )) : <p>Loading Coins...</p>}
      </div>

      <div className="pagination">
        {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;