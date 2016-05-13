require '01_hanoi'

describe TowersOfHanoiGame do
  subject(:towers) { TowersOfHanoiGame.new }

  it "sets stacks up in the default way" do
    expect(towers.stacks).to eq([[3, 2, 1], [], []])
  end

  describe "#render" do
    it "pretty-prints stacks" do
      expect(towers.render).to eq("Tower 0:  3  2  1\nTower 1:  \nTower 2:  \n")
    end

    it "prints shorter stacks" do
      towers = TowersOfHanoiGame.new([[1], [2], [3]])
      expect(towers.render).to eq("Tower 0:  1\nTower 1:  2\nTower 2:  3\n")
    end
  end

  describe "#move" do
    it "allows moving to a blank space" do
      towers.move(0, 1)
      expect(towers.stacks).to eq([[3, 2], [1], []])
    end

    it "allows moving onto a larger disk" do
      towers = TowersOfHanoiGame.new([[1], [2], []])
      towers.move(0, 1)
      expect(towers.stacks).to eq([[], [2, 1], []])
    end

    it "does not allow moving from an empty stack" do
      expect do
        towers.move(1, 2)
      end.to raise_error("cannot move from empty stack")
    end

    it "does not allow moving onto a smaller disk" do
      towers = TowersOfHanoiGame.new([[1], [2], []])
      expect do
        towers.move(1, 0)
      end.to raise_error("cannot move onto smaller disk")
    end
  end

  describe "#game_won?" do
    it "is not won at the start" do; expect(towers).not_to be_won; end

    it "is won when all disks are moved" do
      towers = TowersOfHanoiGame.new([[], [], [3, 2, 1]])
      expect(towers).to be_won
    end
  end
end
