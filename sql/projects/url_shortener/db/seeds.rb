# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  u1 = User.create!(email: "cwhite@gmail.com", premium: true)
  u2 = User.create!(email: "bwarford@gmail.com")

  su1 = ShortenedUrl.create_for_user_and_long_url!(
    u1, "www.google.com"
  )

  su2 = ShortenedUrl.create_for_user_and_long_url!(
    u2, "www.google2.com"
  )

  su3 = ShortenedUrl.create_for_user_and_long_url!(
    u2, "www.imdb.com"
  )

  Visit.record_visit!(u1, su1)
  Visit.record_visit!(u1, su1)
  Visit.record_visit!(u1, su2)

  Visit.record_visit!(u2, su2)
  Visit.record_visit!(u2, su2)
  Visit.record_visit!(u2, su1)
  Visit.record_visit!(u2, su3)

  tt1 = TagTopic.create!(name: "Search")
  tt2 = TagTopic.create!(name: "Movies")

  Tagging.create!(shortened_url_id: su1.id, tag_topic_id: tt1.id)
  Tagging.create!(shortened_url_id: su2.id, tag_topic_id: tt1.id)
  Tagging.create!(shortened_url_id: su3.id, tag_topic_id: tt2.id)
end
