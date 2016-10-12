json.array!(@users) do |user|
  json.(user, *User.column_names)
  json.followed(current_user.follows?(user))  # hidden N+1 query fixed!
end
