/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Router = __webpack_require__(1);
	let Compose = __webpack_require__(2);
	let Inbox = __webpack_require__(4);
	let Sent = __webpack_require__(3);
	let routes = {
	  index: Compose,
	  compose: Compose,
	  inbox: Inbox,
	  sent: Sent
	};

	document.addEventListener("DOMContentLoaded", () => {
	  let content = document.querySelector(".content");
	  router = new Router(content, routes);
	  router.start();
	  let navItems = Array.from(document.querySelectorAll(".sidebar li"));
	  navItems.forEach(navItem => {
	    navItem.addEventListener("click", () => {
	      let name = navItem.innerText.toLowerCase();
	      let i = Math.max(1, window.location.href.indexOf("#"));
	      window.location.replace(
	        window.location.href.slice(0, i) + '#' + name
	      );
	    });
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Router(node, routes) {
	  this.node = node;
	  this.routes = routes;
	}

	Router.prototype.start = function () {
	  window.addEventListener("hashchange", () => {
	    let component = this.activeRoute();
	    this.node.innerHTML = component.render();
	  });
	  console.log("Router started");
	  let component = this.activeRoute();
	  this.node.innerHTML = component.render();
	};

	Router.prototype.activeRoute = function () {
	  let hash = location.hash.substr(1);
	  let component = this.routes[hash];
	  if(!component) {
	    component = this.routes.index;
	  }
	  return component;
	};

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  render: function () {
	    return (
	      `
	      <textarea rows='10' cols='100'></textarea>
	      `
	    );
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  render: function () {
	    return (
	      `
	      Sent messages
	      <ul>
	        <li>Hi there</li>
	        <li>Email</li>
	        <li>Message</li>
	      </ul>
	      `
	    );
	  }
	};



/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  render: function () {
	    return (
	      `
	      Inbox
	      <ul>
	        <li>Hi there</li>
	        <li>Email</li>
	        <li>Message</li>
	      </ul>
	      `
	    );
	  }
	};


/***/ }
/******/ ]);