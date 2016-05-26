# Welcome to the N+1 Query Buster!

# Your job today is to eliminate all the costly, inefficient `N+1` queries in the code snippets below. Read through the associations and methods for each example to understand what needs to be fetched, then decide whether `.includes?` or `.joins` is a better fit for the situation and implement whichever you choose.


# Artists, Albums, and Tracks

# app/models/album.rb
class Album
  # ...
  belongs_to :artist,
    foreign_key: :artist_id,
    primary_key: :id,
    class_name: :Artist
  # ...
end


# app/models/artist.rb
class Artist
  has_many :albums,
    foreign_key: :artist_id,
    primary_key: :id,
    class_name: :Album
  # ...

  def n_plus_one_tracks
    albums = self.albums
    tracks_count = {}
    albums.each do |album|
      albums[album.name] = album.tracks.length
    end

    tracks_count
  end

  def better_tracks_query
    albums = self
      .albums
      .select("albums.*, COUNT(*) AS tracks_count")
      .joins(:tracks)
      .group("albums.id")

    album_counts = {}
    albums.each do |album|
      album_counts[album.name] = album.tracks_count
    end

    album_counts
  end
end




# Plants, Gardeners, and Houses

#Create an array of all the seeds within a given house.

# app/models/gardener.rb
class Gardener
  # ...
  belongs_to :house,
    foreign_key: :house_id,
    primary_key: :id,
    class_name: :House

  has_many :plants,
    foreign_key: :gardener_id,
    primary_key: :id,
    class_name: :Gardener
  # ...
end


# app/models/plant.rb
class Plant
  # ...
  belongs_to :gardener,
    foreign_key: :gardener_id,
    primary_key: :id,
    class_name: :Gardener

  has_many :seeds,
    foreign_key: :plant_id,
    primary_key: :id,
    class_name: :Seed
  # ...
end



# app/models/seed.rb
class Seed
  # ...
  belongs_to :plant,
    foreign_key: :plant_id,
    primary_key: :id,
    class_name: :Plant
  # ...
end


# app/models/house.rb
class House
  has_many :gardeners,
    foreign_key: :house_id,
    primary_key: :id,
    class_name: :Gardener

  has_many :plants,
    through: :gardeners,
    source: :plants
  # ...

  def n_plus_one_seeds
    plants = self.plants
    seeds = []
    plants.each do |plant|
      seeds << plant.seeds
    end

    seeds
  end

  def better_seeds_query
    plants = self.plants.includes(:seeds)
    seeds = []

    plants.each do |plant|
      # will not fire a query for each plant since seeds have already been prefetched
      seeds << plant.seeds
    end

    seeds
  end
end




# MUNI Routes, Buses, and Drivers

#Create a hash with each bus as a key and an array of bus drivers as the corresponding value.
#e.g. `{'47' => ['Joan Lee', 'Charlie McDonald', 'Kevin Quashie'], 'N Judah' => ['Ed Michaels', 'Lisa Frank', 'Sharla Alegria']}`

# app/models/driver.rb
class Driver
  # ...
  belongs_to :routes,
    foreign_key: :route_id,
    primary_key: :id,
    class_name: :Route
  # ...
end


# app/models/route.rb
class Route
  has_many :drivers,
    foreign_key: :route_id,
    primary_key: :id,
    class_name: :Driver

  has_many :buses,
    foreign_key: :route_id,
    primary_key: :id,
    class_name: :Bus
  # ...
end


# app/models/bus.rb
class Bus
  belongs_to :routes,
    foreign_key: :route_id,
    primary_key: :id,
    class_name: :Route
  # ...

  def n_plus_one_drivers
    routes = self.routes
    all_drivers = {}
    routes.each do |route|
      drivers = []
      route.drivers.each do |driver|
        drivers << driver
      end
      all_drivers[route] = drivers

    all_drivers
  end

  def better_drivers_query
    routes = self.routes.includes(:drivers)
    all_drivers = {}

    routes.each do |route|
      drivers = []
      # will not fire a query for each route since drivers have already been prefetched
      route.drivers.each do |driver|
        drivers << driver
      end
      all_drivers[route] = drivers

    all_drivers
  end
end
