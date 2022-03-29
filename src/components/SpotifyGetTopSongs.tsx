import axios from "axios";
import React, { useState } from "react";

const SpotifyGetTopSongs = () => {
    const [token, setToken] = useState<string | null>("");
    const [data, setData] = useState<any>({});


    const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5"

    React.useEffect(() => {
        if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const handleGetTopTracks = async (e: any) => {
        axios.get(TOP_ARTISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token
            },
        }).then((response) => {
            setData(response.data);
        })
        .catch((error) => {console.log(error)})
    }


  return(
    <>
    <button onClick={handleGetTopTracks}>Get Top Songs</button>
    {data.items ? data.items.map((item: any) => <p>{item.name}</p>) : null}
    </>
  )
};

export default SpotifyGetTopSongs;