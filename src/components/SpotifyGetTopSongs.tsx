import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, styled, Box, Grid, Paper, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";

const SpotifyGetTopSongs = () => {
    const [token, setToken] = useState<string | null>("");
    const [data, setData] = useState<any>({});


    const TOP_ARTISTS_MEDIUMTERM_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0"
    const TOP_ARTISTS_SHORTTERM_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0"

    React.useEffect(() => {
        if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const handleGetTopTracks_MedTerm = async (e: any) => {
        axios.get(TOP_ARTISTS_MEDIUMTERM_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token
            },
        }).then((response) => {
            setData(response.data);
        })
        .catch((error) => {console.log(error)})
    }

    const handleGetTopTracks_ShortTerm = async (e: any) => {
      axios.get(TOP_ARTISTS_SHORTTERM_ENDPOINT, {
          headers: {
              Authorization: "Bearer " + token
          },
      }).then((response) => {
          setData(response.data);
      })
      .catch((error) => {console.log(error)})
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return(
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Button variant="contained" onClick={handleGetTopTracks_MedTerm}>Last 6 Months</Button>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" onClick={handleGetTopTracks_ShortTerm}>Last 4 Weeks</Button>
        </Grid>
        <Grid item xs={8}>
        </Grid>
      </Grid>
    </Box>
    
    
    <br />
    {data.items ? data.items.map((item: any) => <div key={data.id}>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={item.name}
        subheader={item.artists[0].name}
      />
      <CardMedia
        component="img"

        image={item.album.images[0].url}
      />
    </Card>
    <br />
    </div>) : null}
    </>
  )
};

export default SpotifyGetTopSongs;