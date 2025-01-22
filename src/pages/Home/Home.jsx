import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Thy greens run long, thy red be none,   with crypto, as it is with options.
          Give us Today our daily gains, and forgive us our losses, as we forgive those who short against us.
          And not lead us into margin call, but deliver us our tredies now untill forever.Amen.
        </p>
        <form>
          <input type="text" placeholder='Search Crypto' />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24 Hr</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
  )
}

export default Home
