class PagesController < ApplicationController
  def home
    @users_on_map = User.where(on_map: true).where.not(location_id: nil)
  end

  def about
  end

  def admin_dashboard
    if current_user && current_user.is_admin
      @users = User.all
      @default_img = view_context.asset_path("default.png")
  	end
  end
end
