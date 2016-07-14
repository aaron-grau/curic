# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create_table "cats", force: true do |t|
#   t.date     "birth_date",            null: false
#   t.string   "color",                 null: false
#   t.string   "name",                  null: false
#   t.string   "sex",         limit: 1, null: false
#   t.text     "description"
#   t.datetime "created_at"
#   t.datetime "updated_at"
#   t.integer  "user_id",               null: false
# end
#
# create_table "users", force: true do |t|
#   t.string   "password_digest", null: false
#   t.string   "session_token",   null: false
#   t.string   "username",        null: false
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

10.times do |i|
  u = User.create!(username: Faker::Name.name, password: "password")
  c = Cat.create!(
    user_id: u.id,
    name: Faker::Hipster.word,
    color: Cat::CAT_COLORS.sample,
    sex: ["M", "F"].sample,
    description: Faker::Hipster.sentence,
    birth_date: Faker::Date.between(10.years.ago, Date.today)
    )
end
