let Router = require("./router");
let Compose = require("./Compose");
let Inbox = require("./Inbox");
let Sent = require("./Sent");

let routes = {
  index: Compose,
  compose: Compose,
  inbox: Inbox,
  sent: Sent
};


//TODO Refactor
document.addEventListener("DOMContentLoaded", () => {
  let content = document.querySelector(".content");
  router = new Router(content, routes);
  router.start();
  let navItems = Array.from(document.querySelectorAll(".sidebar li"));
  navItems.forEach(navItem => {
    navItem.addEventListener("click", () => {
      let name = navItem.innerText.toLowerCase();
      location.hash = name;
    });
  });
});
