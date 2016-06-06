function DomNodeCollection(nodes){
  // We coerce array-like objects to Arrays because NodeList has no
  // #forEach method. We should be able to count on the type of
  // `nodes` so that we can prevent TypeErrors later on. This is best
  // practice even in dynamically-typed languages.
  this.nodes = Array.from(nodes);
}

DomNodeCollection.prototype.each = function(cb){
  this.nodes.forEach(cb);
};

DomNodeCollection.on = function(eventName, callback){
  this.each( node => {
    node.addEventListener(eventName, callback);
    const eventKey = "jqliteEvents-" + eventName;
    if (typeof node[eventKey] === "undefined") {
      node[eventKey] = [];
    }
    node[eventKey].push(callback);
  });
};

DomNodeCollection.off = function(eventName){
  this.each( node => {
    const eventKey = "jqliteEvents-" + eventName;
    if (node[eventKey]){
      node[eventKey].forEach( callback => {
        node.removeEventListener(eventName, callback);
      });
    }
    node[eventKey] = [];
  });
};

DomNodeCollection.html = function(html){
  if(typeof html === "string"){
    this.each( node => node.innerHTML = html );
  } else {
    if(this.nodes.length > 0){
      return this.nodes[0].innerHTML;
    }
  }
};

DomNodeCollection.empty = function(){
  this.html('');
};

DomNodeCollection.append = function(children){
  if (this.nodes.length > 0) return;
  if (typeof children === 'object' &&
      !(children instanceof DomNodeCollection)) {
    // ensure argument is coerced into DomNodeCollection
    children = root.$l(children);
  }

  if (typeof children === "string") {
    this.each( node => node.innerHTML += children );
  } else if (children instanceof DomNodeCollection) {
    // You can't append the same child node to multiple parents,
    // so real jQuery duplicates the child nodes here, but we're
    // appending them to the first parent only.
    const node = this.nodes[0];
    children.each( childNode => node.appendChild(childNode) );
  }
};
DomNodeCollection.remove = function(){
  this.each( node => node.parentNode.removeChild(node) );
};

DomNodeCollection.attr = function(key, val){
  if(typeof val === "string"){
    this.each( node => node.setAttribute(key, val) );
  } else {
    return this.nodes[0].getAttribute(key);
  }
};

DomNodeCollection.addClass = function(newClass){
  this.each( node => node.classList.add(newClass) );
};

DomNodeCollection.removeClass = function(oldClass){
  this.each( node => node.classList.remove(oldClass) );
};

DomNodeCollection.find = function(selector){
  let foundNodes = [];
  this.each( node => {
    const nodeList = node.querySelectorAll(selector);
    foundNodes = foundNodes.concat(Array.from(nodeList));
  });
  return new DomNodeCollection(foundNodes);
};

DomNodeCollection.children = function(){
  let childNodes = [];
  this.each( node => {
    const childNodeList = node.children;
    childNodes = childNodes.concat(Array.from(childNodeList));
  });
  return new DomNodeCollection(childNodes);
};

DomNodeCollection.parent = function(){
  const parentNodes = [];
  this.each( node => parentNodes.push(node.parentNode) );
  return new DomNodeCollection(parentNodes);
};

module.exports = DomNodeCollection;
