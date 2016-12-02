class ResourcesController < ApplicationController
  def index
  	@resources = Resource.all
  end

  def new
  	@resource = Resource.new
  end

  def create
	  @resource = Resource.new(resource_params)

    if @resource.save
      flash[:success] = "#{@resource.title} was successfully uploaded!"
      redirect_to resource_topics_path
    else
      flash.now[:error] = @resource.errors.full_messages.first
      render "new"
    end
  end

  def edit
    @resource = Resource.find(params[:id])
  end

  def update
    @resource = Resource.find(params[:id])
    @old_resource_topic_id = @resource.resource_topic_id
    if @resource.update(resource_params)
      redirect_to resource_topic_path(id: @old_resource_topic_id)
    else
      flash[:error] = @resource.errors.full_messages.first
      render "edit"
    end
  end

  def destroy
  	@resource = Resource.find(params[:id])
    @resource_topic_id = @resource.resource_topic_id
  	@resource.destroy
  	redirect_to resource_topic_path(id: @resource_topic_id)
  end

  def show
  end

  private
	def resource_params
	  params.require(:resource).permit(:title, :description, :attachment, :resource_topic_id)
	end

end
