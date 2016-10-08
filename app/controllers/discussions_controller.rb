class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:edit, :update, :destroy]

  def index
  	@discussion = Discussion.all.sort_by &:created_at
    if params[:discussion_id]
      @discussion = Discussion.find(params[:discussion_id])
    else
      @discussion = Discussion.first
    end
  end

  def create
  	discussion = Discussion.new(discussion_params)
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
  	redirect_to discussions_path
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
