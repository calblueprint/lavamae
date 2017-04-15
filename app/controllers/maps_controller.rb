class MapsController < ApplicationController
  def map
    @users_on_map = User.where(admin_map_approval: true).where(on_map: true)
  end
end
