require 'spec_helper'

describe BasketballTeam do
  context "upon creation" do
    it "orders by city" do
      cavs = BasketballTeam.create!({:name => "Cavaliers",
                                     :city => "Cleveland"});
      hawks = BasketballTeam.create!({:name => "Hawks",
                                 :city => "Atlanta"});
      expect(BasketballTeam.ordered_by_city).to eq([hawks, cavs])
    end

    it "can be created successfully with appropriate params" do
      cavs = BasketballTeam.create!({:name => "Cavaliers",
                               :city => "Cleveland"});
      expect(BasketballTeam.find(cavs.id)).to eq(cavs)
    end

    it "validates uniqueness of name" do
      cavs1 = BasketballTeam.create!({:name => "Cavaliers", :city => "Cleveland"})
      cavs2 = BasketballTeam.new({:name => "Cavaliers", :city => "Dallas"})
      expect(cavs2.valid?).not_to eq(true)
    end

  end

  context "without name or city" do
    let(:incomplete_team) {BasketballTeam.new}

    it "validates presence of name" do
      expect(incomplete_team).to have(1).error_on(:name)
    end

    it "validates presence of city" do
      expect(incomplete_team).to have_at_least(1).error_on(:city)
    end

    it "fails validation with no name expecting a specific message" do
      expect(incomplete_team.errors_on(:name)).to include("can't be blank")
    end
  end

  it "should have many teams" do
    association = BasketballTeam.reflect_on_association(:basketball_players)
    expect(association.macro).to eq(:has_many)
  end

  context "with players" do
    subject(:team) {BasketballTeam.create!({:name => "Cavaliers", :city => "Cleveland"})}
    let!(:kyrie) {BasketballPlayer.create!({name: "Kyrie Irving", team_id: team.id})}
    let!(:anderson) {BasketballPlayer.create!({name: "Anderson Varejao", team_id: team.id})}

    it "sets up a has_many relationship correctly" do
      expect(team.basketball_players).to eq([kyrie, anderson])
    end

  end

  context "scopes" do
    context "#playoffs" do
      it "has the correct values hash" do
        expect(BasketballTeam.playoff_teams.where_values_hash).to eq({"playoffs" => true})
      end
      
      context "returns correct data" do
        before(:all) do
          @cavs = BasketballTeam.create!({:name => "Cavaliers", :city => "Cleveland", :playoffs => true})
          @suns = BasketballTeam.create!({:name => "Suns", :city => "Phoenix", :playoffs => false})
        end 

        it "returns good teams" do
          expect(BasketballTeam.playoff_teams).to include(@cavs)
        end

        it "does not return terrible teams" do
          expect(BasketballTeam.playoff_teams).not_to include(@suns)
        end
      end

    end
  end

end
