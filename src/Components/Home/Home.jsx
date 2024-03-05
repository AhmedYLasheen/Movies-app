
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { Navigate, useNavigate } from 'react-router-dom';



export default function Home() {
  let baseImgUr = 'https://image.tmdb.org/t/p/original';
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTvShow, setTrendingTvShow] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  
  async function getTrendigItems(mediaType,callback) {

    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=52bbcddeda849047525b51d6f8a12361 `)
    callback(data.results);
    // console.log(data.results);
  }

  useEffect(() => {
    getTrendigItems('movie',setTrendingMovies)
    getTrendigItems('tv',setTrendingTvShow)
    getTrendigItems('person',setTrendingPeople)
  }, [])

  let navigate=useNavigate();
  function goToDetails(id){
    navigate({
      pathname:'/details',
      search:`?id=${id}`
    })
  }

  return (
    <>
      <div className="row">

        <div className="col-md-4 d-flex align-items-center">
          <div  className='w-100'>
          <div className={`w-25 ${style.bord}`}></div>
          <h2>Trending</h2>
          <h2>Movies</h2>
          <h2>TO Wach now</h2>
          <p className='secondColor'>Most Wached Movies By Day</p>
          <div className={`w-75 ${style.bord}`}></div>
          </div>
        </div>
        {trendingMovies.map((movie , index) =>(
          <div onClick={()=>goToDetails(movie.id)} className="col-md-2 my-3" key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUr + movie.poster_path }  />
              <h4>{movie.original_title}</h4>
            </div>
          </div>
        ))}
      </div>
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
      <div className="row">

        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
          <div className={`w-25 ${style.bord}`}></div>
          <h2>Trending</h2>
          <h2>person</h2>
          <h2>TO Wach now</h2>
          <p className='secondColor'>Most Wached person By Day</p>
          <div className={`w-75 ${style.bord}`}></div>
          </div>
        </div>
        {trendingPeople.map((person , index) =>(
          <div className="col-md-2 my-3" key={index}>
            <div>
              <img className='w-100 mb-3' src={baseImgUr + person.profile_path }  />
              <h4>{person.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
