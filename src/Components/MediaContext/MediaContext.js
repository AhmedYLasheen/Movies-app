
import { createContext, useEffect, useState } from "react";
import axios from 'axios'




export let mediaContext = createContext([]);
export function MediaContextProvider(props) {
    let [trendingMovies, setTrendingMovies] = useState([]);
    let [trendingTvShow, setTrendingTvShow] = useState([]);
    let [trendingPeople, setTrendingPeople] = useState([]);

    async function getTrendigItems(mediaType, callback) {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=52bbcddeda849047525b51d6f8a12361 `
        );
        callback(data.results);
        // console.log(data.results);
    }

    useEffect(() => {
        getTrendigItems("movie", setTrendingMovies);
        getTrendigItems("tv", setTrendingTvShow);
        getTrendigItems("person", setTrendingPeople);
    }, []);

    
return <mediaContext.Provider value={{trendingMovies,trendingTvShow,trendingPeople}}>
{props.children}
</mediaContext.Provider>

}
