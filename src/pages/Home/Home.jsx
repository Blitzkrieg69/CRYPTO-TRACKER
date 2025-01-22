import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p></p>
        Discover the latest trends in the cryptocurrency market. Stay updated with real-time data and make informed decisions to maximize your investments.
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
          <p style={{textAlign:"center"}}>24 Hr</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
  )
}

export default Home
