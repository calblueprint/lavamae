class PagesController < ApplicationController
  def home
    @users_on_map = User.where(on_map: true).where.not(location_id: nil)
  end
end
