import { Routes, Route, useNavigate } from 'react-router-dom';
import About from '../About/About';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Navbar from '../Navbar/Navbar';
import Notfount from '../Notfount/Notfount';
import People from '../People/People';
import Register from '../Register/Register';
import Tvshows from '../Tvshows/Tvshows';
import './App.css';
import { useEffect, useState } from 'react';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Details from '../Details/Details';
import { MediaContextProvider } from '../MediaContext/MediaContext';

// import { jwtDecode } from 'jwt-decode';

function App() {

  let [logingData, setLogingData] = useState(null);
  function setUserData() {
    let token = localStorage.getItem("token");
    // let decoded = jwtDecode(token);
    setLogingData(token);
    console.log(logingData);
  }

  let navigat = useNavigate();
  function logOut() {
    localStorage.removeItem('token')
    setUserData(null);
    navigat('/login')
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData()
    }
  }

    , [])

  return (
    <>

      <Navbar logingData={logingData} logOut={logOut}
      />
      <div className='container'>

        <MediaContextProvider>
        <Routes>

          <Route element={<PrivateRoute logingData={logingData} />} >
          <Route path='/' element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          </Route>
          
          <Route path='movies' element={<Movies />}></Route>
          <Route path='tvshows' element={<Tvshows />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='people' element={<People />}></Route>
          <Route path='details' element={<Details/>}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login setUserData={setUserData} />}></Route>
          <Route path='*' element={<Notfount />}></Route>
        </Routes>
        </MediaContextProvider>
      </div>

    </>
  );
}

export default App;
