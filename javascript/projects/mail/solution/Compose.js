let content = "";
let Sent = require("./Sent");

function Message (to = "", subject = "", body = "") {
  this.to = to;
  this.subject = subject;
  this.body = body;
}

let currentMessage = new Message();

module.exports = {
  renderForm: function () {
    let html = `
    <p class="new-message-header">New Message</p>
    <form class="compose-form">
    <input
      placeholder='Recipient'
      name='to'
      type="text"
      value='${currentMessage.to}'>

    <input
      placeholder='Subject'
      name='subject'
      type="text"
      value='${currentMessage.subject}'>

    <textarea
      name='body'
      class='body'
      rows='20'>${currentMessage.body}</textarea>

    <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>
    `;
    return html;
  },
  render: function () {
    let container = document.createElement("div");
    container.className = "new-message";
    container.innerHTML = this.renderForm();
    container.addEventListener('change', e => {
      let target = e.target;
      currentMessage[target.name] = target.value;
    });

    container.addEventListener('submit', e => {
      e.preventDefault();
      Sent.addSentMessage(currentMessage);
      currentMessage = new Message();
      location.hash = "inbox";
    });

    return container;
  }
};
