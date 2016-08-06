import React from 'react';
import ReactDOM from 'react-dom';
import Congrats from './congrats';

document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector("#root");
	ReactDOM.render(<Congrats/>, root);
});
