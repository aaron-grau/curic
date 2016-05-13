ActiveRecord::Base.transaction do
  u1 = User.create!(email: "cwhite@gmail.com")
  u2 = User.create!(email: "bwarford@gmail.com")

  su1 = ShortenedUrl.create_for_user_and_long_url!(
    u1, "www.google.com",
  )

  su2 = ShortenedUrl.create_for_user_and_long_url!(
    u2, "www.google2.com",
  )

  v1 = Visit.record_visit!(u1, su1)
  v2 = Visit.record_visit!(u1, su1)
  v3 = Visit.record_visit!(u1, su2)

  v4 = Visit.record_visit!(u2, su2)
  v5 = Visit.record_visit!(u2, su2)
  v6 = Visit.record_visit!(u2, su1)
end
