import React from 'react';

const POKEMON_LOADING_URL = "http://orig15.deviantart.net/4317/f/2015/094/c/c/pokeball_by_watolf-d8ogz4y.gif"

export default function LoadingIcon(props) {
  return <img src={ POKEMON_LOADING_URL } alt="pokemon loading" />;
};
