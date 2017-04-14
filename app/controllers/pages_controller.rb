class PagesController < ApplicationController
  def home
    @users_on_map = User.where.not(location_id: nil)
  end

  def about
  end
end
