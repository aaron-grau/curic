let messages = [
  {to: "friend@mail.com", subject: "Check this out"},
  {to: "person@mail.com", subject: "zzz"}
];

module.exports = {
  addSentMessage: function (message) {
    messages.push(message);
  },
  renderMessage: function (message) {
    let messageEl = document.createElement("li");
    messageEl.className = "message";
    messageEl.innerHTML = `
    <span class="from">To: ${message.to}</span>
    <span>${message.subject}</span>
    `;
    return messageEl;
  },
  render: function() {
    let container = document.createElement("ul");
    container.className = "messages";
    messages.forEach(message => {
      container.appendChild(this.renderMessage(message));
    });
    return container;
  }
};

