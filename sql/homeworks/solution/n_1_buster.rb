# Artists, Albums, and Tracks

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




# Plants, Gardeners, and Houses

def better_seeds_query
  plants = self.plants.includes(:seeds)
  seeds = []

  plants.each do |plant|
    # will not fire a query for each plant since seeds have already been prefetched
    seeds << plant.seeds
  end

  seeds
end




# MUNI Routes, Buses, and Drivers

def better_drivers_query
  buses = self.buses.includes(:drivers)
  
  all_drivers = {}
  buses.each do |bus|
    drivers = []
    # will not fire a query for each route since drivers have already been prefetched
    bus.drivers.each do |driver|
      drivers << driver.name
    end
    all_drivers[bus.id] = drivers
  end

  all_drivers
end
