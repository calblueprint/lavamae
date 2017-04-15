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

ActiveRecord::Schema.define(version: 20170415192320) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  create_table "discussions", force: :cascade do |t|
    t.integer  "score"
    t.text     "content"
    t.string   "tag"
    t.boolean  "is_resolved"
    t.string   "title"
    t.boolean  "is_admin"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
  end

  add_index "discussions", ["user_id"], name: "index_discussions_on_user_id", using: :btree

  create_table "discussions_users", id: false, force: :cascade do |t|
    t.integer "discussion_id"
    t.integer "user_id"
  end

  add_index "discussions_users", ["discussion_id"], name: "index_discussions_users_on_discussion_id", using: :btree
  add_index "discussions_users", ["user_id"], name: "index_discussions_users_on_user_id", using: :btree

  create_table "discussions_users_upvote", id: false, force: :cascade do |t|
    t.integer "upvote_discussion"
    t.integer "upvote_user"
  end

  add_index "discussions_users_upvote", ["upvote_discussion"], name: "index_discussions_users_upvote_on_upvote_discussion", using: :btree
  add_index "discussions_users_upvote", ["upvote_user"], name: "index_discussions_users_upvote_on_upvote_user", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "photo"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.string   "title"
    t.text     "description"
  end

  create_table "locations", force: :cascade do |t|
    t.string   "place"
    t.decimal  "lat",        precision: 10, scale: 6
    t.decimal  "lng",        precision: 10, scale: 6
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "resource_topics", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description"
    t.string   "attachment"
  end

  create_table "resources", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.text     "description"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "attachment"
    t.integer  "resource_topic_id"
  end

  add_index "resources", ["user_id"], name: "index_resources_on_user_id", using: :btree

  create_table "responses", force: :cascade do |t|
    t.text     "content"
    t.integer  "score"
    t.integer  "discussion_id"
    t.boolean  "is_admin"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "user_id"
    t.string   "user_name"
    t.string   "user_image"
  end

  add_index "responses", ["user_id"], name: "index_responses_on_user_id", using: :btree

  create_table "responses_users_upvote", id: false, force: :cascade do |t|
    t.integer "upvote_response"
    t.integer "upvote_user"
  end

  add_index "responses_users_upvote", ["upvote_response"], name: "index_responses_users_upvote_on_upvote_response", using: :btree
  add_index "responses_users_upvote", ["upvote_user"], name: "index_responses_users_upvote_on_upvote_user", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["context"], name: "index_taggings_on_context", using: :btree
  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy", using: :btree
  add_index "taggings", ["taggable_id"], name: "index_taggings_on_taggable_id", using: :btree
  add_index "taggings", ["taggable_type"], name: "index_taggings_on_taggable_type", using: :btree
  add_index "taggings", ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type", using: :btree
  add_index "taggings", ["tagger_id"], name: "index_taggings_on_tagger_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "upvotes", force: :cascade do |t|
    t.integer  "upvotable_id"
    t.string   "upvotable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "user_id"
  end

  add_index "upvotes", ["upvotable_type", "upvotable_id"], name: "index_upvotes_on_upvotable_type_and_upvotable_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "organization"
    t.integer  "num_actions"
    t.boolean  "is_admin"
    t.boolean  "on_map"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "email",                  default: "",    null: false
    t.string   "profile_pic"
    t.integer  "location_id"
    t.integer  "map_approval_state",     default: 0
    t.string   "website"
    t.string   "secondary_name"
    t.string   "secondary_email"
    t.string   "tertiary_name"
    t.string   "tertiary_email"
    t.boolean  "volunteer",              default: false
    t.boolean  "seeking_volunteer",      default: false
    t.text     "bio"
    t.boolean  "admin_map_approval",     default: true
  end

  add_index "users", ["location_id"], name: "index_users_on_location_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "discussions", "users"
  add_foreign_key "resources", "users"
  add_foreign_key "responses", "users"
  add_foreign_key "users", "locations"
end
