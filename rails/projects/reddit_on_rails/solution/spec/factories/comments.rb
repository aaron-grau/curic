# Read about factories at https://github.com/thoughtbot/factory_girl
require 'faker'
FactoryGirl.define do
  factory :comment do
    body Faker::Lorem.paragraph
  end
end
