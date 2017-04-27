class ResponsesController < ApplicationController

  before_action :get_response, only: [:edit, :update, :destroy]
  before_action :get_discussion, only: [:edit, :update, :create, :destroy]

  def create
    response = Response.new(response_params)
    response.discussion_id = @discussion.id
    response.user_id = current_user.id
    response.user_name = current_user.full_name
    response.score = 0
    response.upvotes = []
    if current_user.profile_pic?
      response.user_image = view_context.image_path(current_user.profile_pic)
    else
      response.user_image = view_context.image_path("default.png")
    end
    if response.save
      redirect_to discussions_path(discussion_id: @discussion.id)
    else
      redirect_to root_path
    end
  end

  def update
    @response.update(response_params)
    respond_to do |format|
      format.json { render json: @response.to_json }
    end
  end

  def destroy
    @response.destroy
    redirect_to discussions_path(discussion_id: params[:discussion_id])
  end

  def upvote
    @response = Response.find(params[:response_id])
    @upvote = @response.upvotes.find_by(user_id: current_user.id)
    if !@upvote
      @response.upvotes.create(user_id: current_user.id)
      @response.score += 1
      @response.save
    elsif @upvote
      @response.upvotes.destroy(@upvote)
      @response.score -= 1
      @response.save
    end
    redirect_to discussions_path(discussion_id: params[:discussion_id])
  end

  private
    def response_params
      params.require(:response).permit(:content, :score, upvotes:[])
    end

    def get_response
      @response = Response.find(params[:id])
    end

    def get_discussion
      @discussion = Discussion.find(params[:discussion_id])
    end

end
