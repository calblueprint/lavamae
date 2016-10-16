class DiscussionsController < ApplicationController

  before_action :get_discussion, only: [:edit, :update, :destroy]

  def index
    @discussions = Discussion.all
    if params[:discussion_id]
      @discussion = Discussion.find(params[:discussion_id])
    else
      @discussion = Discussion.first
    end
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
<<<<<<< HEAD

  end

  def edit

  end

  def update
    
=======
    # nothing here
  end

  def edit
  end

  def update
>>>>>>> 0539fb958fb683de263e8165f1981303645bc61f
  end

  def destroy
    @discussion.destroy
    redirect_to discussions_path
  end

  private
    def discussion_params
        params.require(:discussion).permit(:content, :title)
    end

    def get_discussion
        @discussion = Discussion.find(params[:id])
    end

end
