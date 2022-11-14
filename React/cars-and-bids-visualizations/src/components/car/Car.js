import './Car.css'
import { useState, useEffect } from 'react';

const Car = (data) => {

  return ( 
    <>
      <div 
        className={data.selected ? "car car-selected" : "car"}
        onClick={() => {window.open(data.car.Link, '_blank');}}
        title="View on Carsandbids.com"
        >
        <div className="info">
          {data.car == null ?
          <>
            <h2>Select a point</h2>
          </> 
          :
          <>
            <span class="title-bar">
              <h3>{data.car.Model}</h3>
              <button className="button add" title="Add to custom list">+</button>
            </span>
            <h5>{data.car.Result} on {data.car['Date-Ended']}</h5>
            <p>{data.car.Description}</p>
          </>}
        </div>
      </div>
    </>
  ); 
}
 
export default Car;