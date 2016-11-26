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

def cast_list(title)
  # List all the actors for a particular movie, given the title.
  # Sort the results by starring order (ord).
  Actor
    .joins(:movies)
    .where("movies.title = ?", title)
    .order("castings.ord")
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


