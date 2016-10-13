# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

todo0 = Todo.create(
  title: "pass all the assessments",
  body: "I am capable of crushing every assessment if I study enough",
  done: false)
Step.create(
  title: "A01",
  body: "study all the ruby things",
  todo_id: todo0.id,
  done: false)
Step.create(
  title: "A02",
  body: "play cards, with the power of code",
  todo_id: todo0.id,
  done: false)
Step.create(
  title: "A03",
  body: "make associations, SQLZoo",
  todo_id: todo0.id,
  done: false)
Step.create(
  title: "A04",
  body: "be my authentic self, but more prepared",
  todo_id: todo0.id,
  done: false)
Step.create(
  title: "A05",
  body: "I love javascript",
  todo_id: todo0.id,
  done: false)

todo1 = Todo.create(
  title: "get a job",
  body: "at a sweet company",
  done: false)
Step.create(
  title: "prepare job search materials",
  body: "I will make beautiful and awe-inspiring portfolio pieces",
  todo_id: todo1.id,
  done: false)
Step.create(
  title: "apply to companies",
  body: "Submit many many applications",
  todo_id: todo1.id,
  done: false)
Step.create(
  title: "do interviews",
  body: "Impress companies with my depth and breadth of knowledge & shining personality",
  todo_id: todo1.id,
  done: false)
Step.create(
  title: "negotiate offers",
  body: "So many companies want me, but who wants me the mostest?",
  todo_id: todo1.id,
  done: false)
Step.create(
  title: "begin employment",
  body: "Impress and astound my new coworkers",
  todo_id: todo1.id,
  done: false)

todo2 = Todo.create(
  title: "maintain personal hygiene",
  body: "I want to be a sparkling human",
  done: true)

Step.create(
  title: "brush teeth",
  body: "standard practice is twice per day",
  todo_id: todo2.id,
  done: true)
Step.create(
  title: "shower regularly",
  body: "I will wash my body",
  todo_id: todo2.id,
  done: true)
Step.create(
  title: "laundry",
  body: "don't forget the softener",
  todo_id: todo2.id,
  done: true)

Todo.create(
  title: "exercise",
  body: "I will exercise more than my typing fingers",
  done: false)

Todo.create(
  title: "eat a lot of noodles",
  body: "noodles make me feel happy and loved",
  done: false
)
