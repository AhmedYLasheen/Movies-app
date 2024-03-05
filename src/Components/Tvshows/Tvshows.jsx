import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import style from '../Home/Home.module.css'
import { mediaContext } from '../MediaContext/MediaContext';



export default function Tvshows() {
  let baseImgUr = 'https://image.tmdb.org/t/p/original';
  let {trendingTvShow}=useContext(mediaContext);


  return (
    <>
    <div className="row">

    <div className="col-md-4 d-flex align-items-center">
      <div className='w-100'>
      <div className={`w-25 ${style.bord}`}></div>
      <h2>Trending</h2>
      <h2>TvShows</h2>
      <h2>TO Wach now</h2>
      <p className='secondColor'>Most Wached TvShows By Day</p>
      <div className={`w-75 ${style.bord}`}></div>
      </div>
    </div>
    {trendingTvShow.map((tv , index) =>(
      <div className="col-md-2 my-3" key={index}>
        <div>
          <img className='w-100 mb-3' src={baseImgUr + tv.poster_path }  />
          <h4>{tv.name}</h4>
        </div>
      </div>
    ))}
  </div>
  </>
  )
}
