/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.$l = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var DomNodeCollection = __webpack_require__(2);
	
	var _docReadyCallbacks = [], _docReady = false;
	
	function $l (arg){
	  var returnValue;
	  switch(typeof(arg)){
	    case "function":
	      registerDocReadyCallback(arg);
	      break;
	    case "string":
	      returnValue = getNodesFromDom(arg);
	      break;
	    case "object":
	      if(arg instanceof HTMLElement){
	        returnValue = new DomNodeCollection([arg]);
	      }
	      break;
	  }
	  return returnValue;
	}
	
	$l.extend = function(base){
	  var otherObjs = Array.prototype.slice.call(arguments, 1);
	  otherObjs.forEach(function(obj){
	    for(var prop in obj){
	      if (obj.hasOwnProperty(prop)){
	        base[prop] = obj[prop];
	      }
	    }
	  });
	  return base;
	};
	
	$l.ajax = function(options){
	  var request = new XMLHttpRequest();
	  var defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    success: function(){},
	    error: function(){},
	    data: {},
	  };
	  options = $l.extend(defaults, options);
	
	  if (options.method.toUpperCase() === "GET"){
	    //data is query string for get
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  request.open(options.method, options.url, true);
	  request.onload = function (e) {
	    //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };
	
	  request.send(JSON.stringify(options.data));
	};
	
	//helper methods
	function toQueryString (obj){
	  var result = "";
	  for(var prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	function registerDocReadyCallback (func){
	  if(!_docReady){
	    _docReadyCallbacks.push(func);
	  } else {
	    func();
	  }
	}
	
	function getNodesFromDom (selector){
	  var nodes = [].slice.call(document.querySelectorAll(selector), 0);
	  return new DomNodeCollection(nodes);
	}
	
	document.addEventListener('DOMContentLoaded', function () {
	  _docReady = true;
	  _docReadyCallbacks.forEach(function(func){ func(); });
	});
	
	module.exports = $l;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function DomNodeCollection(nodes){
	  // We coerce array-like objects to Arrays because NodeList has no
	  // #forEach method. We should be able to count on the type of
	  // `nodes` so that we can prevent TypeErrors later on. This is best
	  // practice even in dynamically-typed languages.
	  this.nodes = Array.prototype.slice.call(nodes);
	}
	
	DomNodeCollection.prototype = {
	  each: function(cb){
	    this.nodes.forEach(cb);
	  },
	  on: function(eventName, callback){
	    this.each(function(node){
	      node.addEventListener(eventName, callback);
	      var eventKey = "jqliteEvents-" + eventName;
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
	  },
	  off: function(eventName){
	    this.each(function(node){
	      var eventKey = "jqliteEvents-" + eventName;  
	      if (node[eventKey]){       
	        node[eventKey].forEach(function(callback){
	          node.removeEventListener(eventName, callback);
	        });
	      }
	      node[eventKey] = [];
	    });
	  },
	  html: function(html){
	    if(typeof html === "string"){
	      this.each(function(node){
	        node.innerHTML = html;
	      });
	    } else {
	      if(this.nodes.length > 0){
	        return this.nodes[0].innerHTML;
	      }
	    }
	  },
	  empty: function(){
	    this.html('');
	  },
	  append: function(children){
	    if (this.nodes.length > 0) return;
	    if (typeof children === 'object' &&
	        !(children instanceof DomNodeCollection)) {
	      // ensure argument is coerced into DomNodeCollection
	      children = root.$l(children);
	    }
	
	    if (typeof children === "string") {
	      this.each(function (node) {
	        node.innerHTML += children;
	      });
	    } else if (children instanceof DomNodeCollection) {
	      // You can't append the same child node to multiple parents,
	      // so real jQuery duplicates the child nodes here, but we're
	      // appending them to the first parent only.
	      var node = this.nodes[0];
	      children.each(function (childNode) {
	        node.appendChild(childNode);
	      });
	    }
	  },
	  remove: function(){
	    this.each(function(node){
	      node.parentNode.removeChild(node);
	    });
	  },
	  attr: function(key, val){
	    if(typeof val === "string"){
	      this.each(function(node){
	        node.setAttribute(key, val);
	      });
	    } else {
	      return this.nodes[0].getAttribute(key);
	    }
	  },
	  addClass: function(newClass){
	    this.each(function(node){
	      node.classList.add(newClass);
	    });
	  },
	  removeClass: function(oldClass){
	    this.each(function(node){
	      node.classList.remove(oldClass);
	    });
	  },
	  find: function(selector){
	    var foundNodes = [];
	    this.each(function(node){
	      var nodeList = node.querySelectorAll(selector);
	      foundNodes = foundNodes.concat([].slice.call(nodeList));
	    });
	    return new DomNodeCollection(foundNodes);
	  },
	  children: function(){
	    var childNodes = [];
	    this.each(function(node){
	      var childNodeList = node.children;
	      childNodes = childNodes.concat([].slice.call(childNodeList));
	    });
	    return new DomNodeCollection(childNodes);
	  },
	  parent: function(){
	    var parentNodes = [];
	    this.each(function(node){
	      parentNodes.push(node.parentNode);
	    });
	    return new DomNodeCollection(parentNodes);
	  }
	};
	
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map