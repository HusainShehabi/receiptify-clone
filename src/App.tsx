import { useEffect, useState } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import SpotifyGetTopSongs from './components/SpotifyGetTopSongs';

function App() {
  var scope = 'user-top-read';

  const CLIENT_ID = "ca2a7b906f7249369617fe8577278df7"
  const REDIRECT_URI = "https://spotify-tracks-retrieve.netlify.app" //live
  //const REDIRECT_URI = "http://localhost:3000" //local
  const  AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token:any = window.localStorage.getItem("token")

    if (!token && hash) {
      
      token = hash.substring(1).split("&")?.find((elem: string) => elem.startsWith("access_token="))?.split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      
    }

    setToken(token)

   
  }, [])

  const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Top Tracks v0.1</h1>
        <h3>Made By Husain Ebrahim</h3>
          {token ? 
          <SpotifyGetTopSongs/>  

          : <h2>Please Login</h2>
        }
        {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
         to Spotify</a>
        : <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}

export default App;
