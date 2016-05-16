require 'spec_helper'

describe "the signup process" do 
  before(:each) do
    BasketballTeam.create!({:name => "Cavaliers", :city => "Cleveland"})
  end

  it "has a new user page" do 
    visit new_user_url
    expect(page).to have_content "New user"
  end

  describe "signing up a user" do
    before(:each) do
      visit new_user_url
      fill_in 'username', :with => "testing_username"
      fill_in 'password', :with => "biscuits"
      click_on "Create User"
    end

    it "redirects to team index page after signup" do
      expect(page).to have_content "Team Index Page"
    end

    it "shows username on the homepage after signup" do
      expect(page).to have_content "testing_username"
    end

  end

  describe "javascript" do
    it "works with javascript", :js => true do 
      visit basketball_teams_path
      click_link('Not Yet')
      expect(page).to have_content "YAY"
    end
  end

end