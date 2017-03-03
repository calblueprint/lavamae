class PagesController < ApplicationController
  def home
    @users_on_map = User.where(map_approval_state: "approved").where.not(location_id: nil)
  end
end
