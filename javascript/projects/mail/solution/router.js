function Router(node, routes) {
  this.node = node;
  this.routes = routes;
}

Router.prototype.start = function () {
  this.render();
  window.addEventListener("hashchange", () => {
    this.render();
  });
};

Router.prototype.render = function () {
  this.node.innerHTML = "";
  let component = this.activeRoute();
  if(component) {
    this.node.appendChild(component.render());
  }
}

Router.prototype.activeRoute = function () {
  let hash = location.hash.substr(1);
  let component = this.routes[hash];
  return component;
};

module.exports = Router;
