let messages = [
  {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out"},
  {from: "person@mail.com", subject: "zzz"}
];
module.exports = {
  render: function() {
    let container = document.createElement("ul");
    messages.forEach(message => {
      let messageEl = document.createElement("li");
      messageEl.innerHTML = `<strong>From:</strong> ${message.from} <strong>Subject:</strong> ${message.subject}`;
      container.appendChild(messageEl);
    });
    return container;
  }
};


