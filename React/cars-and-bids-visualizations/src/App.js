import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import Chart from './components/chart/Chart';
import Car from './components/car/Car';
import Search from './components/search/Search';

const jsonData = require('./data/data.json');

function App() {

  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("All results");

  const getData = async () => {
    setData(jsonData);
    setChartData(jsonData);
    //console.log(jsonData);
  }

  const reset = () => {
    setChartData(data);
    setSelected(null);
    setSearchQuery("All results");
  }

  useEffect(() => {
    alert("Please note this website is not finished and still in beta")
    getData();
  }, []);

  return (
    <>
      <div className="menu">
        - Menu -
      </div>
      <div className="main">
        <div className="left">
          {chartData != null ? 
          <>
            <div id="chart-title">
              <h2>Visualize / {searchQuery}</h2>
              <h4>{chartData.length} results</h4>
            </div>
            <Chart plots={chartData} selected={setSelected} /> 
          </>
          : null}
          <div className="selected">
            <Car car={selected} selected={false}/>
          </div>
        </div>
        <div className="right">
          {chartData != null ? <Search reset={reset} data={chartData} searchQuery={searchQuery} setData={setChartData} setSearchQuery={setSearchQuery} selected={selected} /> : null}
        </div>
      </div>
    </>
  );
}

export default App;
