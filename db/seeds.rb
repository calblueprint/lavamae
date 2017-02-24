# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def make_users
  1.upto(10) do |n|
    user = User.create(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      organization: "Lava Mae",
      is_admin: false,
      on_map: true,
      email: "user#{n}@lavamae.org",
      password: "password",
      password_confirmation: "password"
    )
    user.id = n
    user.save
  end
end

def make_admins
  11.upto(15) do |n|
    admin = User.create(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      organization: "Lava Mae",
      is_admin: true,
      email: "admin#{n}@lavamae.org",
      password: "password",
      password_confirmation: "password"
    )
    admin.id = n
    admin.save
  end
end

make_users
make_admins
