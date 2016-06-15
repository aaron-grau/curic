const messageStore = require('./messageStore');

module.exports = {
  renderMessage: function(message) {
    let messageEl = document.createElement("li");
    messageEl.className = "message";
    messageEl.innerHTML =`
    <span class='from'>${message.from}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>
    `;
    return messageEl;
  },
  render: function() {
    let container = document.createElement("ul");
    container.className = "messages";
    let messages = messageStore.getInboxMessages();
    messages.forEach(message => {
      container.appendChild(this.renderMessage(message));
    });
    return container;
  }
};


