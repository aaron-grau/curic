let content = "";
let Sent = require("./Sent");
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
  }
};
