const APIUtil = {

  followUser(id) {
    return APIUtil.changeFollowStatus(id, "POST");
  },

  unfollowUser(id) {
    return APIUtil.changeFollowStatus(id, "DELETE");
  },

  changeFollowStatus(id, method) {
    return $.ajax({
      url: `/users/${id}/follow`,
      dataType: "json",
      method
    });
  },

  searchUsers(query) {
    return $.ajax({
      url: "/users/search",
      dataType: "json",
      method: "GET",
      data: { query }
    });
  },

  createTweet(data) {
    return $.ajax({
      url: "/tweets",
      method: "POST",
      dataType: "json",
      data
    });
  },

  fetchTweets(data) {
    return $.ajax({
      url: "/feed",
      dataType: "json",
      data
    });
  }
};

module.exports = APIUtil;
