require 'spec_helper'

describe PostSub do

  it { should validate_presence_of(:post) }
  it { should validate_presence_of(:sub) }

  it { should belong_to(:post) }
  it { should belong_to(:sub) }
end
