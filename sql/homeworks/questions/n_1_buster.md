# Welcome to the N+1 Query Buster!

Your job today is to eliminate all the costly, inefficient `N+1` queries in the code snippets below. Read through the associations and methods for each example to understand what needs to be fetched, then decide whether `.includes` or `.joins` is a better fit for the situation and implement whichever you choose.

In the methods containing `# TODO: your code here` write the Active Record code that will produce the same
result without causing an N+1 query. There are no skeleton projects provided: you will have to carefully
think through the effects of what you write.

Refer to the [joins demo][demo] for hints on what you might want to do!

[demo]: ../../demos/joins_demo/lib

## Artists, Albums, and Tracks

Count all of the tracks on each album by a given artist.

```ruby
# app/models/track.rb
class Track
   belongs_to(
    :album,
    class_name: "Album",
    foreign_key: :album_id,
    primary_key: :id
  )
end


# app/models/album.rb
class Album
  belongs_to(
    :artist,
    class_name: "Artist",
    foreign_key: :artist_id,
    primary_key: :id
  )

  has_many(
    :tracks,
    class_name: "Track",
    foreign_key: :album_id,
    primary_key: :id
  )
end


# app/models/artist.rb
class Artist
  has_many(
    :albums,
    class_name: "Album",
    foreign_key: :artist_id,
    primary_key: :id
  )

  def n_plus_one_tracks
    albums = self.albums
    tracks_count = {}
    albums.each do |album|
      tracks_count[album.name] = album.tracks.length
    end

    tracks_count
  end

  def better_tracks_query
    # TODO: your code here
  end
end
```




## Plants, Gardeners, and Houses

Create an array of all the seeds within a given house.

```ruby
# app/models/gardener.rb
class Gardener
  belongs_to(
    :house,
    class_name: "House",
    foreign_key: :house_id,
    primary_key: :id
  )

  has_many(
    :plants,
    class_name: "Gardener",
    foreign_key: :gardener_id,
    primary_key: :id
  )
end


# app/models/plant.rb
class Plant
  belongs_to(
    :gardener,
    class_name: "Gardener",
    foreign_key: :gardener_id,
    primary_key: :id
  )

  has_many(
    :seeds,
    class_name: "Seed",
    foreign_key: :plant_id,
    primary_key: :id
  )
end



# app/models/seed.rb
class Seed
  belongs_to(
    :plant,
    class_name: "Plant",
    foreign_key: :plant_id,
    primary_key: :id
  )
end


# app/models/house.rb
class House
  has_many(
    :gardeners,
    class_name: "Gardener",
    foreign_key: :house_id,
    primary_key: :id
  )

  has_many(
    :plants,
    through: :gardeners,
    source: :plants
  )

  def n_plus_one_seeds
    plants = self.plants
    seeds = []
    plants.each do |plant|
      seeds << plant.seeds
    end

    seeds
  end

  def better_seeds_query
    # TODO: your code here
  end
end
```




## MUNI Routes, Buses, and Drivers

Create a hash with bus id's as keys and an array of bus drivers as the corresponding value.
E.g. `{'1' => ['Joan Lee', 'Charlie McDonald', 'Kevin Quashie'], '2' => ['Ed Michaels', 'Lisa Frank', 'Sharla Alegria']}`

```ruby
# app/models/driver.rb
class Driver
  belongs_to(
    :bus,
    class_name: "Bus",
    foreign_key: :bus_id,
    primary_key: :id
  )
end


# app/models/bus.rb
class Bus
  belongs_to(
    :route,
    class_name: "Route",
    foreign_key: :route_id,
    primary_key: :id,
  )

  has_many(
    :drivers,
    class_name: "Driver",
    foreign_key: :bus_id,
    primary_key: :id,
  )
end


# app/models/route.rb
class Route
  has_many(
    :buses,
    class_name: "Bus",
    foreign_key: :route_id,
    primary_key: :id
  )

  def n_plus_one_drivers
    buses = self.buses

    all_drivers = {}
    buses.each do |bus|
      drivers = []
      bus.drivers.each do |driver|
        drivers << driver.name
      end
      all_drivers[bus.id] = drivers
    end

    all_drivers
  end

  def better_drivers_query
    # TODO: your code here
  end
end
```
