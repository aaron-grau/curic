/* jshint esversion: 6 */

const DomNodeCollection = require("./dom_node_collection");

const _docReadyCallbacks = [];
let _docReady = false;

const $l = arg => {
  let returnValue;
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
};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach( obj => {
    for(var prop in obj){
      base[prop] = obj[prop];
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
