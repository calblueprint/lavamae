class MapsController < ApplicationController
  def map
    @users_on_map = User.where(on_map: true)
  end
end
