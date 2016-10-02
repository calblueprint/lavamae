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

ActiveRecord::Schema.define(version: 20161002200608) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "discussions", force: :cascade do |t|
    t.integer  "score"
    t.text     "content"
    t.string   "tag"
    t.boolean  "is_resolved"
    t.string   "title"
    t.boolean  "is_admin"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "responses", force: :cascade do |t|
    t.text     "content"
    t.integer  "score"
    t.integer  "discussion_id"
    t.boolean  "is_admin"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password"
    t.string   "organization"
    t.string   "location"
    t.integer  "num_actions"
    t.boolean  "is_admin"
    t.boolean  "on_map"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end
end
