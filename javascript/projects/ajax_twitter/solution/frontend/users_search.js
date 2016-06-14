const FollowToggle = require('./follow_toggle');

function UsersSearch(el) {
  this.$el = $(el);
  this.$input = this.$el.find("input[name=username]");
  this.$ul = this.$el.find(".users");

  this.$input.on("input", this.handleInput.bind(this));
}

UsersSearch.prototype.handleInput = function (event) {
  if (this.$input.val() === "") {
    this.renderResults([]);
    return;
  }

  $.ajax({
    url: "/users/search",
    dataType: "json",
    method: "GET",
    data: { query: this.$input.val() },
    success: this.renderResults.bind(this)
  });
};

UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    let $a = $("<a></a>");
    $a.text(user.username);
    $a.attr("href", "/users/" + user.id);

    let $followToggle = $("<button></button>");
    new FollowToggle($followToggle, {
      userId: user.id,
      followState: user.followed ? "followed" : "unfollowed"
    });

    let $li = $("<li></li>");
    $li.append($a);
    $li.append($followToggle);

    this.$ul.append($li);
  }
};

module.exports = UsersSearch;
