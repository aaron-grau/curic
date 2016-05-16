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
