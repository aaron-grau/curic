let content = "";
let Sent = require("./Sent");
let message = {
  to: "",
  subject: "",
  body: ""
};
module.exports = {
  // render: function () {
  //   return (
  //     `
  //     <textarea rows='10' cols='100'>${content}</textarea>
  //     <button>Send!</button>
  //     `
  //   );
  // },
  render: function () {
    let container = document.createElement('div');
    let textarea = document.createElement('textarea');

    textarea.setAttribute('rows', 10);
    textarea.setAttribute('cols', 100);
    textarea.value = content;
    textarea.addEventListener("change", el => {
      content = textarea.value;
    });

    let send = document.createElement("button");
    send.innerText = "Send";
    send.addEventListener("click", el => {
      Sent.addSentMessage(content);
      textarea.value = "";
      content = "";
    });

    container.appendChild(textarea)
    container.appendChild(send);
    return container;
  },
  render: function () {
    let jsx = `
    <p class="new-message-header">New Message</p>
    <form class="compose-form">
    <input placeholder='Recipient' name='to' type="text" value='${message.to}'>
    <input placeholder='Subject' name='subject' type="text" value='${message.subject}'>
    <textarea name='body' class='body' rows='20'>${message.body}</textarea>
    <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>
    `;
    let container = document.createElement("div");
    container.className = "new-message";
    container.innerHTML = jsx;
    container.addEventListener('change', el => {
      let target = el.target;
      message[target.name] = target.value;
    });
    container.addEventListener('submit', el => {
      Sent.addSentMessage(message);
      message.to = "";
      message.subject = "";
      message.body = "";
    });
    container.query
    return container;
  }
};
