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
