require 'spec_helper'

describe Sub do

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:moderator) }

  it { should belong_to(:moderator) }
  it { should have_many(:links) }

  it "associates with the correct moderator even before save via inverse_of" do
    user = FactoryGirl.build(:user)
    sub = user.subs.new(name: "sub")
    expect(sub.moderator).to be(user)
  end
end
