require 'spec_helper'

describe Link do

  it { should validate_presence_of(:url) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:user) }

  it { should have_many(:link_subs) }
  it { should have_many(:subs).through(:link_subs) }
  it { should have_many(:user_votes) }
  it { should have_many(:comments) }
  it { should belong_to(:user) }

  it "associates with the correct link before save via inverse_of" do
    user = FactoryGirl.build(:user)
    link = user.links.new
    expect(link.user).to be(user)
  end

  describe "#comments_by_parent" do

    def build_comment(link, moderator, parent_comment = nil)
      comment = link.comments.new
      comment.parent_comment = parent_comment
      comment.user = moderator
      comment.body = "Lorem ipsum"
      comment.save
      comment
    end

    it "builds a nested comments hash" do
      moderator = FactoryGirl.create(:user)
      sub = moderator.subs.create(name: "A sub!")

      link = Link.new(url: "URL", title: "TITLE")
      link.user = moderator
      link.subs = [sub]
      link.save!

      comment = build_comment(link, moderator)
      child_comment = build_comment(link, moderator, comment)
      grand_child_comment = build_comment(link, moderator, child_comment)

      expect(link.comments_by_parent).to eq({
        nil => [comment],
        comment.id => [child_comment],
        child_comment.id => [grand_child_comment]
      })
    end
  end
end
