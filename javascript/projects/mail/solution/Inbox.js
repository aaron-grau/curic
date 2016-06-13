let messages = [
  "Hey there",
  "$$$$$",
];

module.exports = {
  // render: function () {
  //   return (
  //     `
  //     Inbox
  //     <ul>
  //       <li>Hi there</li>
  //       <li>Email</li>
  //       <li>Message</li>
  //     </ul>
  //     `
  //   );
  // }
  render: function () {
    let container = document.createElement("ul");
    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.innerText = message;
      container.appendChild(messageEl);
    });
    return container;
  }
};
