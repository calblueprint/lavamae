module Api
  class ResponsesController < Api::BaseController
    def get_upvotes
      response = Response.find(params[:response_id])
      upvotes = response.upvotes
      render json: upvotes
    end
  end
end
