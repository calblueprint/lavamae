class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:edit, :update, :destroy, :favorite, :unfavorite]

  def index
    @discussions = Discussion.all
    @all_tags = AdminTag.pluck(:name)
    @loading_bus = view_context.asset_path("lavamae-bus.gif")
    @default_img = view_context.asset_path("default.png")

    if current_user
      @favorite_discussions = current_user.favorite_discussions
      if !params[:fav].blank?
        @discussions = @favorite_discussions
      end
    end

  	@discussions = @discussions.search(params[:search]).order('discussions.created_at DESC')
    @discussions = @discussions.filter(params[:filter]) if params[:filter].present?

    if params[:discussion_id]
      @discussion = Discussion.find(params[:discussion_id])
    else
      @discussion = Discussion.last
    end

    unless @discussion.nil?
      @responses = @discussion.responses.sort_by{|r| [r.score, r.created_at]}.reverse
      @tag_list = @discussion.tag_list
      @discussion_username = @discussion.user.full_name
      @discussion_date = @discussion.created_at
      @upvotes = @discussion.upvotes
      @all_responses = Response.all.sort_by{|r| r.created_at}.reverse
    end
  end

  def create
  	discussion = Discussion.new(discussion_params)
    discussion.score = 0
    discussion.upvotes = []
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
    @all_tags = AdminTag.pluck(:name)
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
    render :action => 'index'
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
    render :action => 'index'
  end

  def upvote
    @discussion = Discussion.find(params[:discussion_id])
    @upvote = @discussion.upvotes.find_by(user_id: current_user.id)
    if !@upvote
      @discussion.upvotes.create(user_id: current_user.id)
      @discussion.score += 1
      @discussion.save
    elsif @upvote
      @discussion.upvotes.destroy(@upvote)
      @discussion.score -= 1
      @discussion.save
    end
    redirect_to discussions_path(discussion_id: params[:discussion_id])
  end

  private
  	def discussion_params
  		params.require(:discussion).permit(:title, :content, :score, upvotes:[], tag_list:[], tags:[])
  	end

  	def get_discussion
  		@discussion = Discussion.find(params[:id])
  	end

    def save_params
    end
end
