# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

g1 = Comment.create!(text: "Gizmo")
g2a = Comment.create!(text: "Gizmo2a", parent_comment_id: g1.id)
g2b = Comment.create!(text: "Gizmo2b", parent_comment_id: g1.id)
g3a = Comment.create!(text: "Gizmo3a", parent_comment_id: g2a.id)
g3b = Comment.create!(text: "Gizmo3b", parent_comment_id: g2a.id)
g3c = Comment.create!(text: "Gizmo3c", parent_comment_id: g2b.id)
m1 = Comment.create(text: "Markov")
m2 = Comment.create!(text: "Markov2", parent_comment_id: m1.id)
