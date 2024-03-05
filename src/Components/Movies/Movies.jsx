
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import style from '../Home/Home.module.css'
import { mediaContext } from '../MediaContext/MediaContext';

export default function Movies() {
  let baseImgUr = 'https://image.tmdb.org/t/p/original';
  let {trendingMovies}=useContext(mediaContext);

  return (
    <>
      <div className="row">

        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className={`w-25 ${style.bord}`}></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>TO Wach now</h2>
            <p className='secondColor'>Most Wached Movies By Day</p>
            <div className={`w-75 ${style.bord}`}></div>
          </div>
        </div>
        {trendingMovies.map((movie, index) => (
          <div className="col-md-2 my-3" key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUr + movie.poster_path} />
              <h4>{movie.original_title}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
