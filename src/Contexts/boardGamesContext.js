import React, { createContext, useState } from "react";
const BoardGamesContext = createContext();

const BoardGamesContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  return <BoardGamesContext.Provider value={(games, setGames)}>{children}</BoardGamesContext.Provider>;
};

const withBoardGames = (Child) => (props) => <BoardGamesContext.Consumer>{(context) => <Child {...props} {...context}></Child>}</BoardGamesContext.Consumer>;

export { BoardGamesContextProvider, withBoardGames };
