class ResponsesController < ApplicationController

  before_action :get_response, only: [:edit, :update, :destroy]
  before_action :get_discussion, only: [:edit, :update, :create, :destroy]

  def create
    response = Response.new(response_params)
    response.discussion_id = @discussion.id
    response.user_id = current_user.id
    if response.save
      redirect_to discussions_path(discussion_id: @discussion.id)
    else
      redirect_to root_path
    end
  end

  def new

  end

  def edit
  
  end

  def update
    @response.update(response_params)
    redirect_to discussions_path(discussion_id: @discussion.id)
  end

  def destroy
    @response.destroy
    redirect_to discussions_path(discussion_id: @discussion.id)
  end

  private
    def response_params
      params.require(:response).permit(:content)
    end

    def get_response
      @response = Response.find(params[:id])
    end

    def get_discussion
      @discussion = Discussion.find(params[:discussion_id])
    end

end
