require 'spec_helper'

describe UserVote do

  it { should validate_presence_of(:user) }

  it { should belong_to(:user) }
  it { should belong_to(:votable) }
end
