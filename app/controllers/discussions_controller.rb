class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:edit, :update, :destroy]

  def index
  	@discussions = Discussion.all.order('created_at DESC')
    if params[:discussion_id]
      @discussion = Discussion.find(params[:discussion_id])
    else
      @discussion = Discussion.first
    end
    unless @discussion.nil?
      @responses = @discussion.responses.sort_by &:created_at
    end
  end

  def create
  	discussion = Discussion.new(discussion_params)
    discussion.score = 0
    discussion.user_id = current_user.id
  	discussion.save
  	redirect_to discussions_path
  end

  def new
  	@discussion = Discussion.new
  end

  def edit
  	# same concept as new/create
  end

  def update
  	@discussion.update(discussion_params)
  	redirect_to discussions_path(discussion_id: @discussion.id)
  end

  def destroy
  	#called in before_action
  	@discussion.destroy
  	redirect_to discussions_path
  end

  private
  	def discussion_params
  		params.require(:discussion).permit(:title, :content)  # return {content: "stuff", title: "stuff"}
  	end

  	def get_discussion
  		@discussion = Discussion.find(params[:id])
  	end

end
