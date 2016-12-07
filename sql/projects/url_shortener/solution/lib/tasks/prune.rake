namespace :prune do
  task :old_urls, [:minutes] => :environment do
    minutes = args[:minutes].to_i || 144
    puts "Pruning old urls..."
    ShortenedUrl.prune(minutes)
  end

end
