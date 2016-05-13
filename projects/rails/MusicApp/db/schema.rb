# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140713002600) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: true do |t|
    t.string   "name",                       null: false
    t.integer  "band_id",                    null: false
    t.integer  "year",                       null: false
    t.boolean  "live",       default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "albums", ["band_id", "name"], name: "index_albums_on_band_id_and_name", unique: true, using: :btree

  create_table "bands", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notes", force: true do |t|
    t.integer  "track_id",   null: false
    t.integer  "user_id",    null: false
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tracks", force: true do |t|
    t.string   "name",                       null: false
    t.integer  "album_id",                   null: false
    t.integer  "ord",                        null: false
    t.boolean  "bonus",      default: false, null: false
    t.text     "lyrics",                     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["album_id", "ord"], name: "index_tracks_on_album_id_and_ord", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                            null: false
    t.string   "password_digest",                  null: false
    t.string   "session_token",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "activated",        default: false
    t.string   "activation_token",                 null: false
  end

  add_index "users", ["activation_token"], name: "index_users_on_activation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
