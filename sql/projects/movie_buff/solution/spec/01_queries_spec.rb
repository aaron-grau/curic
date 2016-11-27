require 'rspec'
require 'rails_helper'
require 'spec_helper'

require_relative '../movie_buff/01_queries.rb'


describe 'it_was_ok' do 
  subject { it_was_ok.as_json }

  it 'retrieves the correct information' do 
    expect(subject).to contain_exactly(
      {"id"=>537, "title"=>"Battlefield Earth", "yr"=>2000, "score"=>2.3, "votes"=>3507, "director_id"=>2806},
      {"id"=>738, "title"=>"Spice World", "yr"=>1997, "score"=>3.0, "votes"=>2694, "director_id"=>2461},
      {"id"=>955, "title"=>"Police Academy 5: Assignment: Miami Beach", "yr"=>1988, "score"=>2.5, "votes"=>2014, "director_id"=>2122},
      {"id"=>1031, "title"=>"Stop! Or My Mom Will Shoot", "yr"=>1992, "score"=>3.0, "votes"=>1817, "director_id"=>407},
      {"id"=>1040, "title"=>"Mortal Kombat: Annihilation", "yr"=>1997, "score"=>3.0, "votes"=>1802, "director_id"=>2424},
      {"id"=>1070, "title"=>"Police Academy 6: City Under Siege", "yr"=>1989, "score"=>2.5, "votes"=>1739, "director_id"=>2754},
      {"id"=>1423, "title"=>"Problem Child 2", "yr"=>1991, "score"=>2.7, "votes"=>1080, "director_id"=>395},
      {"id"=>1572, "title"=>"Baby Geniuses", "yr"=>1999, "score"=>2.2, "votes"=>939, "director_id"=>579},
      {"id"=>1791, "title"=>"Teen Wolf Too", "yr"=>1987, "score"=>2.5, "votes"=>775, "director_id"=>2298},
      {"id"=>1833, "title"=>"Santa Claus Conquers the Martians", "yr"=>1964, "score"=>2.1, "votes"=>750, "director_id"=>2713}
    )
  end
    
  it "hits the database exactly once" do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'harrison_ford' do 
  subject { harrison_ford.as_json }

  it 'retrieves the correct information' do 
    expect(subject).to contain_exactly(
      {"id"=>5, "title"=>"Star Wars: Episode V - The Empire Strikes Back", "yr"=>1980, "score"=>8.6, "votes"=>39446, "director_id"=>651},
      {"id"=>13, "title"=>"Star Wars: Episode VI - Return of the Jedi", "yr"=>1983, "score"=>8.0, "votes"=>30178, "director_id"=>1020},
      {"id"=>1, "title"=>"Star Wars", "yr"=>1977, "score"=>8.8, "votes"=>53567, "director_id"=>360},
      {"id"=>45, "title"=>"Apocalypse Now", "yr"=>1979, "score"=>8.3, "votes"=>19335, "director_id"=>28},
      {"id"=>371, "title"=>"American Graffiti", "yr"=>1973, "score"=>7.7, "votes"=>4669, "director_id"=>360},
      {"id"=>700, "title"=>"Conversation, The", "yr"=>1974, "score"=>8.1, "votes"=>2876, "director_id"=>28}
    )
  end
    
  it "hits the database exactly once" do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'biggest_cast' do 
  subject { biggest_cast.as_json }

  it 'retrieves the correct information' do 
    expect(subject).to contain_exactly(
      {"id"=>373, "title"=>"Fear and Loathing in Las Vegas", "yr"=>1998, "score"=>6.5, "votes"=>4658, "director_id"=>59},
      {"id"=>280, "title"=>"Star Trek: Generations", "yr"=>1994, "score"=>6.0, "votes"=>5674, "director_id"=>2282},
      {"id"=>1153, "title"=>"200 Cigarettes", "yr"=>1999, "score"=>5.3, "votes"=>1573, "director_id"=>2664}
    )
  end
    
  it "hits the database exactly once" do
    expect{ subject }.to make_database_queries(count: 1)
  end
end

describe 'biggest_cast' do 
  them = ["George Lucas", "Steven Spielberg"]
  subject { directed_by_one_of(them).as_json }

  it 'retrieves the correct information' do 
    expect(subject).to contain_exactly(
      {"id"=>7, "title"=>"Schindler's List", "yr"=>1993, "score"=>8.8, "votes"=>34251, "director_id"=>18},
      {"id"=>8, "title"=>"Saving Private Ryan", "yr"=>1998, "score"=>8.5, "votes"=>34113, "director_id"=>18},
      {"id"=>11, "title"=>"Raiders of the Lost Ark", "yr"=>1981, "score"=>8.6, "votes"=>31750, "director_id"=>18},
      {"id"=>37, "title"=>"Indiana Jones and the Last Crusade", "yr"=>1989, "score"=>7.8, "votes"=>20897, "director_id"=>18},
      {"id"=>66, "title"=>"E.T. the Extra-Terrestrial", "yr"=>1982, "score"=>7.7, "votes"=>14062, "director_id"=>18},
      {"id"=>103, "title"=>"Indiana Jones and the Temple of Doom", "yr"=>1984, "score"=>6.9, "votes"=>10674, "director_id"=>18},
      {"id"=>133, "title"=>"Close Encounters of the Third Kind", "yr"=>1977, "score"=>7.7, "votes"=>9107, "director_id"=>18},
      {"id"=>265, "title"=>"Hook", "yr"=>1991, "score"=>5.6, "votes"=>5852, "director_id"=>18},
      {"id"=>454, "title"=>"Color Purple, The", "yr"=>1985, "score"=>7.4, "votes"=>3973, "director_id"=>18},
      {"id"=>500, "title"=>"Amistad", "yr"=>1997, "score"=>7.2, "votes"=>3700, "director_id"=>18},
      {"id"=>512, "title"=>"Empire of the Sun", "yr"=>1987, "score"=>7.3, "votes"=>3647, "director_id"=>18},
      {"id"=>885, "title"=>"1941", "yr"=>1979, "score"=>5.5, "votes"=>2222, "director_id"=>18},
      {"id"=>939, "title"=>"Always", "yr"=>1989, "score"=>6.2, "votes"=>2050, "director_id"=>18},
      {"id"=>1, "title"=>"Star Wars", "yr"=>1977, "score"=>8.8, "votes"=>53567, "director_id"=>360},
      {"id"=>17, "title"=>"Star Wars: Episode I - The Phantom Menace", "yr"=>1999, "score"=>7.3, "votes"=>28641, "director_id"=>360},
      {"id"=>371, "title"=>"American Graffiti", "yr"=>1973, "score"=>7.7, "votes"=>4669, "director_id"=>360},
      {"id"=>1238, "title"=>"THX 1138", "yr"=>1970, "score"=>6.4, "votes"=>1388, "director_id"=>360}
   )
  end
    
  it "hits the database exactly once" do
    expect{ subject }.to make_database_queries(count: 1)
  end
end


describe 'movie_names_before_1940' do
	subject { movie_names_before_1940.to_a }

	it 'retrieves the correct information' do
		expect(subject).to contain_exactly(
     "Wizard of Oz, The",
     "Gone with the Wind",
     "Mr. Smith Goes to Washington",
     "Snow White and the Seven Dwarfs",
     "Duck Soup",
     "Modern Times",
     "Bringing Up Baby",
     "City Lights",
     "39 Steps, The",
     "Gold Rush, The",
     "Adventures of Robin Hood, The",
     "All Quiet on the Western Front",
     "Night at the Opera, A",
     "Nosferatu, eine Symphonie des Grauens",
     "General, The",
     "Frankenstein",
     "Stagecoach",
     "Bronenosets Potyomkin",
     "Thin Man, The",
     "Grande illusion, La",
     "Freaks",
     "Bride of Frankenstein",
     "Un chien andalou"
    )
	end

  it "hits the database exactly once" do
    expect{ subject }.to make_database_queries(count: 1)
  end
end



