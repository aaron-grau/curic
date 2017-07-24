const APIUtil = require('./api_util');

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.lastCreatedAt = null;

    this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this));
    this.$el.on("insert-tweet", this.insertTweet.bind(this));
  }

  fetchTweets(event) {
    event.preventDefault();

    const infiniteTweets = this;
    const data = {};
    if (this.lastCreatedAt) data.max_created_at = this.lastCreatedAt;

    APIUtil.fetchTweets(data).then((data) => {
      infiniteTweets.insertTweets(data);

      if (data.length < 20) {
        infiniteTweets.$el.find(".fetch-more")
                          .replaceWith("<b>No more tweets!</b>");
      }

      if (data.length > 0) {
        infiniteTweets.lastCreatedAt = data[data.length - 1].created_at;
      }
    });
  }

  insertTweet(event, data) {
    const tmpl = _.template(this.$el.find("script").html());
    this.$el.find("ul.tweets").prepend(tmpl({
      tweets: [data]
    }));

    if (!this.lastCreatedAt) {
      this.lastCreatedAt = data.created_at;
    }
  }

  insertTweets(data) {
    const tmpl = _.template(this.$el.find("script").html());
    this.$el.find("ul.tweets").append(tmpl({
      tweets: data
    }));
  }

}

module.exports = InfiniteTweets;
