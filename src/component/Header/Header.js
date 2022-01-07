import React, { useEffect, useState } from 'react';
import img from '../../images/virus.png'
import '../style.css'

const Header = () => {
  const [timeSeries, setTimeSeries] = useState('')
  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(data => setTimeSeries(data?.Date))
  }, [])
  return (
    <div className='header'>
      <div className="container">
        <div className='logo'>
          <img src={img} alt="" />
          <h1>Covid Update</h1>
        </div>
        <p>{`${timeSeries?.split('T')[0]} at ${timeSeries?.split('T')[1]}`}</p>
        <a href="/">Dashboard</a>
      </div>
    </div>
  );
};

export default Header;