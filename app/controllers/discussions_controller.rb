class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:edit, :update, :destroy, :favorite, :unfavorite]

  def index
    @discussions = Discussion.all
    if current_user
      @favorite_discussions = current_user.favorite_discussions
      if params[:fav]
        @discussions = @favorite_discussions
      end
    end

  	@discussions = @discussions.search(params[:search]).order('created_at DESC')

    if params[:discussion_id]
      @discussion = Discussion.find(params[:discussion_id])
    else
      @discussion = Discussion.last
    end

    unless @discussion.nil?
      @responses = @discussion.responses.sort_by{|r| [r.score, r.created_at]}.reverse
    end
  end

  def create
  	discussion = Discussion.new(discussion_params)
    discussion.score = 0
    discussion.user_id = current_user.id
    if params[:tags]
      params[:tags].each do |t|
        discussion.tag_list.add(t)
      end
    end
  	discussion.save
  	redirect_to discussions_path
  end

  def new
  	@discussion = Discussion.new
  end

  def edit

  end

  def update
  	@discussion.update(discussion_params)
    if params[:discussion].key? :tag_list
      @discussion.tag_list = params[:discussion][:tag_list].join(", ")
    else
      @discussion.tag_list = ""
    end
    @discussion.save
    respond_to do |format|
      format.json { render json: @discussion.to_json }
    end
  end

  def destroy
  	@discussion.destroy
  	redirect_to discussions_path
  end

  def favorite
    if current_user
      current_user.favorite_discussions << @discussion
    end
    redirect_to discussions_path(discussion_id: params[:discussion_id], search: params[:search])
  end

  def unfavorite
    if current_user
      current_user.favorite_discussions.delete(@discussion)
    end
    redirect_to discussions_path(discussion_id: params[:discussion_id], search: params[:search])
  end

  private
  	def discussion_params
  		params.require(:discussion).permit(:title, :content, tag_list:[], tags:[])
  	end

  	def get_discussion
  		@discussion = Discussion.find(params[:id])
  	end

    def save_params
    end

end
