class MapsController < ApplicationController
  def map
    @users_on_map = User.where.not(location_id: nil)
  end
end
