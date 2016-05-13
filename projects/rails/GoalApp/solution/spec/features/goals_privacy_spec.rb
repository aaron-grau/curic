require 'rails_helper'

feature "goal privacy" do
  let!(:hello_world) { FactoryGirl.create(:user_hw) }
  let!(:foo_bar) { FactoryGirl.create(:user_foo) }

  describe "public goals" do
    let!(:hw_goal) { FactoryGirl.create(:goal, author: hello_world) }

    it "should create public goals by default" do
      login_as(hello_world)
      submit_new_goal("build a tesla coil")
      expect(page).to have_content "Public"
    end

    it "shows public goals when logged out" do
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end

    it "allows other users to see public goals" do
      login_as(foo_bar)
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end
  end

  describe "private goals" do
    let!(:private_goal) { FactoryGirl.create(:hw_goal, private: true) }
    let!(:private_goal) do
      FactoryGirl.create(:goal, author: hello_world, private: true)
    end

    it "allows creating private goals" do
      login_as(hello_world)
      visit goal_url(private_goal)
      expect(page).to have_content "Private"
    end

    it "hides private goals when logged out" do
      visit user_url(hello_world)
      expect(page).not_to have_content private_goal.title
    end

    it "hides private goals from other users" do
      login_as(foo_bar)
      visit user_url(hello_world)
      expect(page).not_to have_content private_goal.title
    end
  end
end
