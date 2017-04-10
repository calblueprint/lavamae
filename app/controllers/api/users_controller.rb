module Api
  class UsersController < Api::BaseController
    def get_profile_pic
      user = User.find(params[:user_id])
      render json: user.profile_pic
    end
  end
end
