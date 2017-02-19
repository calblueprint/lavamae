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
      is_admin: false,
    )
    user.id = n
    user.save
  end
end

def make_admins
  1.upto(10) do |n|
    admin = User.create(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      is_admin: true,
    )
    admin.id = n
    admin.save
  end
end

make_users
make_admins
