class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:show, :edit, :update, :destroy]

  def index
    @discussions = Discussion.all
  end

  def create
    discussion = Discussion.new(discussion_params)
    if discussion.save
      redirect_to discussions_path
    else
      redirect_to new_discussion_path
    end
  end

  def new
    # nothing here
  end

  def show 
    # work done in get_discussion
  end

  def edit
  end

  def update
  end

  def destroy
    @discussion.destroy
    redirect_to discussions_path
  end

  def show_responses
    # coms = Comment.where("family_id = ?", @family.id).order(:created_at).reverse
    @discussion.responses
  end
  helper_method :show_responses

  private
    def discussion_params
        params.require(:discussion).permit(:content, :title)
    end

    def get_discussion
        @discussion = Discussion.find(params[:id])
    end

end
