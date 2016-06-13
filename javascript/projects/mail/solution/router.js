function Router(node, routes) {
  this.node = node;
  this.routes = routes;
}

Router.prototype.start = function () {
  window.addEventListener("hashchange", () => {
    let component = this.activeRoute();
    // this.node.innerHTML = component.render();
    this.node.innerHTML = "";
    this.node.appendChild(component.render());
  });
  console.log("Router started");
  let component = this.activeRoute();
  // this.node.innerHTML = component.render();
  this.node.appendChild(component.render());
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
