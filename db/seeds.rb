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
      website: "lavamae.org",
      email: "user#{n}@lavamae.org",
      password: "password",
      password_confirmation: "password",
      map_approval_state: 0
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
      on_map: false,
      website: "lavamae.org",
      email: "admin#{n}@lavamae.org",
      password: "password",
      password_confirmation: "password"
    )
    admin.id = n
    admin.save
  end
end

def make_discussions
  1.upto(10) do |n|
    discussion = Discussion.create(
      content: "lavabae++",
      title: "Discussion #{n}",
      tag_list: ["Volunteering", "Starting up"],
      user_id: n % 5 + 1,
      score: 0
    )
    discussion.score = 0
    discussion.upvotes = []
    discussion.id = n
    discussion.save
  end
end

def make_responses
  1.upto(30) do |n|
    response = Response.create(
      content: "Response!",
      discussion_id: Discussion.find((n / 3.0).ceil).id,
      user_id: n % 5 + 2
    )
    response.score = 0
    response.upvotes = []
    response.id = n
    response.save
  end
end

make_users
make_admins
make_discussions
make_responses

