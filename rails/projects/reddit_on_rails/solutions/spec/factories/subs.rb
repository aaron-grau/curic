# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :sub do
    name { |n| Faker::Name.name }
    association :moderator, factory: :user
  end
end