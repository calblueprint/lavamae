module Api
  class ResponsesController < Api::BaseController
    def get_upvotes
      response = Response.find(params[:response_id])
      upvotes = response.upvotes.find_by(user_id: current_user.id)
      render json: upvotes
    end
  end
end
