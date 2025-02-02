import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'

const Home = () => {

  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Thy greens run long, thy red be none, with crypto, as it is with options.
          Give us Today our daily gains, and forgive us our losses, as we forgive those who short against us.
          And not lead us into margin call, but deliver us our tredies now untill forever. AMEN.
        </p>
        <form>
          <input type="text" placeholder='Search Crypto' />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Symbol</p>
          <p style={{ paddingLeft: 45 }}>Name</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24 Hr</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>
              <>
                <p>{item.market_cap_rank}</p>
                <p style={{ paddingLeft: 10 }}>{item.symbol?.toUpperCase()}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                </div>
                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h>0 ? 'green' : 'red'}>
                  {Math.floor(item.price_change_percentage_24h*100)/100}
                </p>
                <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
              </>
             </div> 
          ))
        }
      </div>
    </div>
  )
}

export default Home
