let messages = [
  {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
  {to: "person@mail.com", subject: "zzz", body: "so booring"}
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
    <span class="subject">${message.subject}</span> -
    <span class="body">${message.body}
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

