require 'spec_helper'

describe LinkSub do

  it { should validate_presence_of(:link) }
  it { should validate_presence_of(:sub) }

  it { should belong_to(:link) }
  it { should belong_to(:sub) }

  it "associates with the correct sub before save via inverse_of" do
    sub = FactoryGirl.build(:sub)
    link_sub = sub.link_subs.new
    expect(link_sub.sub).to be(sub)
  end

  it "associates with the correct link before save via inverse_of" do
    link = FactoryGirl.build(:link)
    link_sub = link.link_subs.new
    expect(link_sub.link).to be(link)
  end
end
