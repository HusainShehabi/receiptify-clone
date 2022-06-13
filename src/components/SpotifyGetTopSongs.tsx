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
import { animated, config, useTransition } from "react-spring";
import "../index.css";

const SpotifyGetTopSongs = () => {
  const [token, setToken] = useState<string | null>("");
  const [data, setData] = useState<any>({});
  const transitions = useTransition(data, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
  });

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
      <div className="button-wrapper">
        <div style={{ padding: "5px" }}>
          <Button onClick={handleGetTopTracks_MedTerm}>Last 6 Months</Button>
        </div>
        <div style={{ padding: "5px" }}>
          <Button onClick={handleGetTopTracks_ShortTerm}>Last 4 Weeks</Button>
        </div>
        <div style={{ padding: "5px" }}>
          <Button onClick={handleGetTopTracks_LongTerm}>All Time</Button>
        </div>
      </div>
      <br />

      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              {data.items
                ? data.items.map((item: any) => (
                    <div key={data.id}>
                      <Card width={350} height={450}>
                        <CardContent style={{ paddingTop: "15px" }}>
                          <CardMedia
                            height={350}
                            src={item.album.images[0].url}
                            style={{ marginBottom: "10px" }}
                          />
                          <Subtitle2
                            secondary
                            style={{
                              fontFamily: "Permanent Marker",
                              fontSize: 20,
                              color: "navy",
                              opacity: 0.6,
                            }}
                          >
                            {item.name}
                          </Subtitle2>
                          <Body2
                            style={{
                              fontFamily: "Permanent Marker",
                              fontSize: 15,
                              color: "navy",
                              opacity: 0.6,
                            }}
                          >
                            {item.artists[0].name}
                          </Body2>
                        </CardContent>
                        <CardAction></CardAction>
                      </Card>
                      <br />
                    </div>
                  ))
                : null}
            </animated.div>
          )
      )}
    </>
  );
};

export default SpotifyGetTopSongs;
