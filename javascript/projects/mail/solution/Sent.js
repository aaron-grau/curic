let messages = [
  {to: "friend@mail.com", subject: "Check this out"},
  {to: "person@mail.com", subject: "zzz"}
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
    container.className = "messages";
    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.className = "message";
      messageEl.innerHTML = `<span class="from">To: ${message.to}</span><span>${message.subject}</span>`;
      container.appendChild(messageEl);
    });
    return container;
  }
};

