let messages = [
  "Check this out",
  "Free candy"
];
module.exports = {
  // render: function () {
  //   return (
  //     `
  //     Sent messages
  //     <ul>
  //       <li>Hi there</li>
  //       <li>Email</li>
  //       <li>Message</li>
  //     </ul>
  //     `
  //   );
  //
  // }
  addSentMessage: function (message) {
    messages.push(message);
  },
  render: function() {
    let container = document.createElement("ul");

    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.innerText = message;
      container.appendChild(messageEl);
    });
    return container;
  }
};

