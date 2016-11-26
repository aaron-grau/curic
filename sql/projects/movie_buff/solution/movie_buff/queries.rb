# == Schema Information
#
# Table name: actors
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: movies
#
#  id          :integer      not null, primary key
#  title       :string
#  yr          :integer
#  score       :float
#  votes       :integer
#  director_id :integer
#
# Table name: castings
#  id          :integer      not null, primary key
#  movie_id    :integer      not null
#  actor_id    :integer      not null
#  ord         :integer


def it_was_ok
  # Consider the following:
  #
  # Movie.where(yr: 1970..1979)
  #
  # We can use ranges (a..b) inside a where method. 
  #
  # Find all movies with scores between 2 and 3

  Movie.where(score: 2..3)
end

def harrison_ford
  # Consider the following:
  #
  # Actor
  #   .joins(:movies)
  #   .where("movies.title = 'Blade Runner'")
  #
  # It's possible to join based on active record relations defined in models.
  #
  # Find all movies in which Harrison Ford appeared but not as a lead actor
  
  Movie
    .joins(:actors)
    .where("actors.name = 'Harrison Ford'")
    .where("castings.ord != 1")
end

def biggest_cast
  # Consider the following:
  # 
  # Actor
  #   .joins(:movies)
  #   .group("actors.id")
  #   .order("COUNT(movies.id) DESC")
  #   .first
  #
  # Sometimes we need to use aggregate SQL functions like COUNT, MAX, and AVG.
  # Often these are combined with group. 
  #
  # Find the movie with the largest cast (i.e most actors)

  Movie
    .joins(:actors)
    .group("movies.id")
    .order("COUNT(actors.id) DESC")
    .first
end

def directed_by_one_of(them)
  # Consider the following:
  #
  # Movie.where("yr IN (?)", years)
  # 
  # We can use IN to test if an element is present in an array. 
  #
  # Find all the movies direct by one of 'them'.

  Movie
    .joins(:director)
    .where("actors.name IN (?)", them)
end

def movie_names_before_1940
  # Consider the following: 
  #
  # Movie.where("score < 2.0").pluck(:title)
  # => ["Police Academy: Mission to Moscow"]
  #
  # Pluck works similarly to select, except that is converts a query result
  # directly into a Ruby Array instead of an ActiveRecord object. This can bring
  # an improvement in performace for larger queries.
  #
  # Use pluck to find the title of all movies made before 1940. 

  Movie.where("yr < 1940").pluck(:title)
end

def eighties_b_movies
	# List all the movies from 1980-1989 with scores falling between 3 and 5 (inclusive).
  # Show the id, title, year, and score.

	Movie.select(:id, :title, :yr, :score).where(yr: 1980..1989, score: 3..5)
end

def vanity_projects
  # List the title of all movies in which the director also appeared as the starring actor.
  # Show the movie id and title and director's name.

  # Note: Directors appear in the 'actors' table.

  Movie
    .select("movies.id, movies.title, actors.name")
    .joins(:actors)
    .where("director_id = actors.id")
    .where("castings.ord = 1")
end

def starring(whazzername)
	# Find the movies with an actor who had a name like `whazzername`.
	# A name is like whazzername if the actor's name contains all of the letters in whazzername,
  # ignoring case, in order.

	# ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but not like "stallone sylvester" or "zylvester ztallone"

	matcher = "%#{whazzername.split(//).join("%")}%"
  Movie.joins(:actors).where("UPPER(actors.name) LIKE UPPER(?)", matcher)

  # Note: The below code also works:
  # Actor.where("name ilike ?", matcher).first.movies

  # As the Postgres docs say,
  # "the keyword ILIKE can be used instead of LIKE to make the match case insensitive according to the active locale.
  # This is not in the SQL standard but is a PostgreSQL extension."
end

def bad_years
  # List the years in which a movie with a rating above 8 was not released.
  Movie.select(:yr, "MAX(score)").group(:yr).having("MAX(score) < 8").pluck(:yr)
end

def golden_age
	# Find the decade with the highest average movie score.
	Movie
    .select("AVG(score), (yr / 10) * 10 AS decade")
    .group("decade")
    .order("avg(score) DESC")
    .first
    .decade
end

def cast_list(title)
  # List all the actors for a particular movie, given the title.
  # Sort the results by starring order (ord).
  Actor
    .joins(:movies)
    .where("movies.title = ?", title)
    .order("castings.ord")
end

def costars(name)
  # List the names of the actors that the named actor has ever appeared with.
  # Hint: use a subquery

  subquery = Movie.select(:id).joins(:actors).where("actors.name = ?", name)
  
  Movie
    .joins(:actors)
    .where("actors.name != ?", name)
    .where("movies.id IN (?)", subquery)
    .distinct
    .pluck(:name)
end

def most_supportive
  # Find the two actors with the largest number of non-starring roles.
  # Show each actor's id, name and number of supporting roles.

  Actor
    .select(:id, :name, "COUNT(castings.actor_id) as roles")
    .joins(:castings)
    .where("castings.ord != 1")
    .group("actors.id")
    .order("roles DESC")
    .limit(2)
end

def what_was_that_one_with(those_actors)
	# Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.

	Movie
    .select(:title, :id)
    .joins(:actors)
    .where("actors.name in (?)", those_actors)
    .group(:id)
    .having("COUNT(actors.id) >= ?", those_actors.length)
end

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie

  Actor
    .select(:name)
    .joins("LEFT OUTER JOIN castings on castings.actor_id = actors.id")
    .where("castings.movie_id IS NULL")
    .count
end

def longest_career
	# Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names

	Actor
    .select(:name, :id, "MAX(movies.yr) - MIN(movies.yr) AS career")
    .joins(:movies)
    .order("career DESC, name")
    .group(:id)
    .limit(3)
end
