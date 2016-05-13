require 'rails_helper'

feature "commenting" do
  let!(:hello_world) { FactoryGirl.create(:user_hw) }
  let!(:foo_bar) { FactoryGirl.create(:user, username: "foo_bar") }
  let!(:foo_goal) do
    FactoryGirl.create(:goal, author: foo_bar)
  end

  before(:each) do
    login_as(hello_world)
    visit user_url(foo_bar)
  end

  # shared examples are another way to DRY out your specs
  # have some docs:
  # https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples
  shared_examples "comment" do
    it "should have a form for adding a new comment" do
      expect(page).to have_content "New Comment"
      expect(page).to have_field "Comment"
    end

    it "should save the comment when a user submits one" do
      fill_in "Comment", with: "my magical comment!"
      click_on "Save Comment"
      expect(page).to have_content "my magical comment!"
    end
  end

  feature "user profile comment" do
    it_behaves_like "comment"
  end

  feature "goal comment" do
    before(:each) do
      click_on foo_goal.title
    end

    it_behaves_like "comment"
  end
end
