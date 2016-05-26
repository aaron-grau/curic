require 'spec_helper'

describe Comment do
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:link) }
  it { should validate_presence_of(:body) }

  it { should belong_to(:user) }
  it { should belong_to(:link) }
  it { should have_many(:child_comments) }

  it "associates with the correct user before save via inverse_of" do
    user = FactoryGirl.build(:user)
    comment = user.comments.new
    expect(comment.user).to be(user)
  end

  it "associates with the correct link before save via inverse_of" do
    link = FactoryGirl.build(:link)
    comment = link.comments.new
    expect(comment.link).to be(link)
  end
end