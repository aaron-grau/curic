# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'
FactoryGirl.define do
  factory :link do
    url Faker::Internet.url
    title Faker::Lorem.word
    body Faker::Lorem.paragraph

    association :user, factory: :user
  end
end