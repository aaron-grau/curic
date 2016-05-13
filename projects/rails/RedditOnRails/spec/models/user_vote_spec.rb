require 'spec_helper'

describe UserVote do

  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:link) }

  it { should belong_to(:user) }
  it { should belong_to(:link) }

  it "associates with the correct user before save via inverse_of" do
    user = FactoryGirl.build(:user)
    user_vote = user.user_votes.new
    expect(user_vote.user).to be(user)
  end

  it "associates with the correct link before save via inverse_of" do
    link = FactoryGirl.build(:link)
    user_vote = link.user_votes.new
    expect(user_vote.link).to be(link)
  end
end