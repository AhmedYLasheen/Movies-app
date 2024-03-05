import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Details() {
    let baseImgUr = 'https://image.tmdb.org/t/p/original';
    let [searchParams, getSearchParams] = useSearchParams();
    let [details, setDetails] = useState({})
    let currentId = searchParams.get("id");

    
    async function getDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=52bbcddeda849047525b51d6f8a12361 `)
        setDetails(data);
        // console.log(data);
    }

    useEffect(() => {
        // getDetails();
    })
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <img className='w-100 py-3' src={baseImgUr + details.poster_path} />
                </div>
                <div className=" col-md-8  py-5" >
                    <h1>{details.original_title}</h1>
                    <p >{details.tagline}</p>
                    <h2>vote_average : {details.vote_average}</h2>
                    <h2>vote_count : {details.vote_count}</h2>
                    <p>{details.overview}</p>
                </div>
            </div>

        </>
    )
}
