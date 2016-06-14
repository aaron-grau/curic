let messages = [
  {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out"},
  {from: "person@mail.com", subject: "zzz"}
];
module.exports = {
  render: function() {
    let container = document.createElement("ul");
    container.className = "messages";
    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.className = "message";
      messageEl.innerHTML =`
        <span class='from'>${message.from}</span><span>${message.subject}</span>
      `;
      container.appendChild(messageEl);
    });
    return container;
  }
};


