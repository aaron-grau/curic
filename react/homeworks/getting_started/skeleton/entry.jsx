import React from React;
import ReactDOM from ReactDOM;
import Congrats from './congrats';

document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector("#root");
	ReactDOM.render(<Congrats/>, root);
});
