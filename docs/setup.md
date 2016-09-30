Web Setup Instructions
-------
Install [Rails.](http://installrails.com/)
1. Clone the Github repo `git clone https://github.com/calblueprint/lavamae.git`
2. Install all appropriate gems `bundle install`
3. Create `config/database.yml` using the template at `config/samples/database.yml`. You may need to create a new Postgres user; there's some information [here](http://stackoverflow.com/questions/16973018/createuser-could-not-connect-to-database-postgres-fatal-role-tom-does-not-e/16974197#16974197) if you run into issues.
4. Create `config/application.yml` using the template at `config/samples/application.yml`. Generate a new secret key using `rake secret` and paste the key into the file as `secret_key_base`.
5. Run `rake db:create` and `rake db:migrate` to set up the database completely.
6. Run `rails s` to start the server, and then navigate to `localhost:3000` to see the website running on your computer!
