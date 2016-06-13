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
    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.innerHTML = `<strong>To:</strong> ${message.to} <strong>Subject:</strong> ${message.subject}`;
      container.appendChild(messageEl);
    });
    return container;
  }
};

