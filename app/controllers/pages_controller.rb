class PagesController < ApplicationController
  def home
    @users_on_map = User.where.not(location_id: nil)
  end

  def about
  end

  def admin_dashboard
    if current_user && current_user.is_admin
      @pending_admins = User.where(admin_approval_state: 0, pending_admin: true)
      @default_img = view_context.asset_path("default.png")
  	end	
  end
end
