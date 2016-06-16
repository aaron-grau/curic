json.extract! bench, :id, :description, :lat, :lng, :seating,
  :picture_url, :average_rating

json.favorite_users bench.favorite_users.map(&:id)

json.reviews do
  json.partial! 'api/reviews/review', collection: bench.reviews, as: :review
end
