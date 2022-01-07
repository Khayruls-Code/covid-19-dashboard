import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const Global = () => {
  const [globalData, setGlobalData] = useState({})
  useEffect(() => {
    fetch('https://corona.lmao.ninja/v2/all?yesterday')
      .then(res => res.json())
      .then(data => setGlobalData(data))
  }, [])
  const { cases, recovered, active, deaths, todayCases, todayRecovered } = globalData
  const covidData = [
    { name: 'Total Case', value: cases },
    { name: 'Total Recovered', value: recovered },
    { name: 'Active Cases', value: active },
    { name: 'Total Deaths', value: deaths },
  ];
  const COLORS = ["#18dcff", "#feca57", "#ff4d4d", "#0be881",];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  let renderLabel = function (entry) {
    return entry.name;
  }

  return (
    <div className='global'>
      <div className="container">
        <h2 className='title'>Global Update</h2>
        <div className="global-row">
          <div className="last-update">
            <div className="info-box">
              <ion-icon style={{ color: "#18dcff" }} name="people"></ion-icon>
              <div>
                <p>Total Cases</p>
                <h1>{cases}</h1>
              </div>
            </div>
            <div className="info-box">
              <ion-icon style={{ color: "#feca57" }} name="happy"></ion-icon>
              <div>
                <p>Total Recovered</p>
                <h1>{recovered}</h1>
              </div>
            </div>
            <div className="info-box">
              <ion-icon style={{ color: "#ff4d4d" }} name="man"></ion-icon>
              <div>
                <p>Active Cases</p>
                <h1>{active}</h1>
              </div>
            </div>
            <div className="info-box">
              <ion-icon style={{ color: "#0be881" }} name="bed"></ion-icon>
              <div>
                <p>Total Deaths</p>
                <h1>{deaths}</h1>
              </div>
            </div>
            <div className="info-box">
              <ion-icon style={{ color: "#f368e0" }} name="person"></ion-icon>
              <div>
                <p>Todays Case</p>
                <h1>{todayCases}</h1>
              </div>
            </div>
            <div className="info-box">
              <ion-icon style={{ color: "#2e86de" }} name="happy"></ion-icon>
              <div>
                <p>Todays Recovered</p>
                <h1>{todayRecovered}</h1>
              </div>
            </div>
          </div>
          <div className="chart">
            <PieChart style={{ margin: "auto" }} label={renderLabel} width={350} height={350}>
              <Pie
                isAnimationActive={true}
                data={covidData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                dataKey="value"
              >
                {covidData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="indicate-color">
              <div><div style={{ backgroundColor: "#18dcff", width: '20px', height: "20px", borderRadius: "50%" }}></div>Total Cases</div>
              <div><div style={{ backgroundColor: "#feca57", width: '20px', height: "20px", borderRadius: "50%" }}></div>Total Recovered</div>
              <div><div style={{ backgroundColor: "#ff4d4d", width: '20px', height: "20px", borderRadius: "50%" }}></div>Active Casess</div>
              <div><div style={{ backgroundColor: "#0be881", width: '20px', height: "20px", borderRadius: "50%" }}></div>Total Deaths</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Global;