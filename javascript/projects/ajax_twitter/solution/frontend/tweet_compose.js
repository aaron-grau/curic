class TweetCompose {
  constructor(el) {
    this.$el = $(el);

    this.$input = this.$el.find("textarea[name=tweet\\[content\\]]");
    this.$input.on("input", this.handleInput.bind(this));

    this.$mentionedUsersDiv = this.$el.find(".mentioned-users");
    this.$el.find("a.add-mentioned-user").on(
      "click", this.addMentionedUser.bind(this));
    this.$mentionedUsersDiv.on(
      "click", "a.remove-mentioned-user", this.removeMentionedUser.bind(this));

    this.$el.on("submit", this.submit.bind(this));
  }

  addMentionedUser(event) {
    event.preventDefault();

    const $mentionedUserSelect = $(this.$mentionedUsersDiv.find("script").html());
    this.$mentionedUsersDiv.find("ul").append($mentionedUserSelect);
  }

  clearInput() {
    this.$input.val("");
    this.$mentionedUsersDiv.find("ul").empty();
    this.$el.find(":input").prop("disabled", false);
    this.$el.find(".char-left").empty();
  }

  handleInput(event) {
    const inputLength = this.$input.val().length;

    this.$el.find(".char-left").text(`${140 - inputLength} characters left`);
  }

  handleSuccess(data) {
    const $tweetsUl = $(this.$el.data("tweets-ul"));
    $tweetsUl.trigger("insert-tweet", data);

    this.clearInput();
  }

  removeMentionedUser(event) {
    event.preventDefault();
    $(event.currentTarget).parent().remove();
  }

  submit(event) {
    event.preventDefault();

    const data = this.$el.serializeJSON();
    this.$el.find(":input").prop("disabled", true);

    $.ajax({
      url: "/tweets",
      method: "POST",
      data,
      dataType: "json",
      success: this.handleSuccess.bind(this)
    });
  }
}

module.exports = TweetCompose;
