import React, { useEffect, useState } from "react";
import BoardGamesBanner from "./BoardGamesBanner";
import axios from "axios";
var convert = require("xml-js");

const api = "https://boardgamegeek.com/xmlapi2/collection?username=";

const memo = (callback) => {
  const cache = new Map();
  return (...args) => {
    const selector = JSON.stringify(args);
    if (cache.has(selector)) return cache.get(selector);
    const value = callback(...args);
    cache.set(selector, value);
    return value;
  };
};

const memoizedAxiosGet = memo(axios.get);

const UserBoardGames = (props) => {
  const [userCollection, setUserCollection] = useState([]);
  useEffect(() => {
    memoizedAxiosGet(api + props.username).then((res) => {
      const jsonData = convert.xml2js(res.data, { compact: true });
      setUserCollection(jsonData.items.item);
    });
  }, [props.username]);
  return <BoardGamesBanner games={userCollection}></BoardGamesBanner>;
};

export default UserBoardGames;
