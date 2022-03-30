import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import { padding } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import {
  Body2,
  Button,
  Card,
  CardAction,
  CardContent,
  CardMedia,
  Subtitle2,
} from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";

const SpotifyGetTopSongs = () => {
  const [token, setToken] = useState<string | null>("");
  const [data, setData] = useState<any>({});

  const TOP_ARTISTS_LONGTERM_ENDPOINT =
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0";
  const TOP_ARTISTS_MEDIUMTERM_ENDPOINT =
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0";
  const TOP_ARTISTS_SHORTTERM_ENDPOINT =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleGetTopTracks_LongTerm = async (e: any) => {
    axios
      .get(TOP_ARTISTS_LONGTERM_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetTopTracks_MedTerm = async (e: any) => {
    axios
      .get(TOP_ARTISTS_MEDIUMTERM_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetTopTracks_ShortTerm = async (e: any) => {
    axios
      .get(TOP_ARTISTS_SHORTTERM_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
  <br />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Button onClick={handleGetTopTracks_MedTerm}>Last 6 Months</Button>
        </Grid>
        <Grid item xs={12}>
        <Button onClick={handleGetTopTracks_ShortTerm}>Last 4 Weeks</Button>
        </Grid>
        <Grid item xs={12}>
        <Button onClick={handleGetTopTracks_LongTerm}>All Time</Button>
        </Grid>
      </Grid>
    </Box>
    <br />
  
      {data.items
        ? data.items.map((item: any) => (
            <div key={data.id}>
              <Card width={350} height={450}>
                <CardContent style={{paddingTop: "15px"}}>
                <CardMedia height={350} src={item.album.images[0].url} style={{marginBottom: "20px"}} />
                  <Subtitle2 secondary style={{ marginBottom: "4px"}}>
                    {item.name}
                  </Subtitle2>
                  <Body2>{item.artists[0].name}</Body2>
                </CardContent>
                <CardAction>
                </CardAction>
              </Card>

              <br />
            </div>
          ))
        : null}
    </>
  );
};

export default SpotifyGetTopSongs;
