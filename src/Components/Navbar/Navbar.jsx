import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'


export default function Navbar({ logingData, logOut }) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg  ${style.navBg}`} >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Noxe  </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {logingData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='home'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='movies'>Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='tvshows'>Tv shows</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='people'>People</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='about'>About</Link>
              </li>
            </ul> : ""}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              {/* {logingData ? <h1 className='mx-3 my-0'>{logingData}</h1> : ''} */}
              <div className="social-links d-flex  align-items-center">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram mx-3 "></i>
                <i className="fa-brands fa-youtube"></i>
              </div>
              {!logingData ? <>
                <li className="nav-item">
                  <Link className="nav-link" to='login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='register'>Register</Link>
                </li></>
                : <li className="nav-item">
                  <a className="nav-link" onClick={logOut}>Log out</a>
                </li>}


            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
