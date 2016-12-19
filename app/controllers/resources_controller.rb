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
    if @resource.update(update_params)
      render_json_message(:ok, message: "Resource successfully updated!")
    else
      render_json_message(:forbidden, errors: resource.errors.full_messages)
    end
  end

  def destroy
  	@resource = Resource.find(params[:id])
  	if @resource.destroy
      render_json_message(:ok, message: 'Deleted resource!')
    else
      render_json_message(:forbidden, errors: @resource.errors.full_messages)
    end
  end

  def show
  end

  private
	def resource_params
	  params.require(:resource).permit(:title, :description, :attachment, :resource_topic_id)
	end

  def update_params
    params.require(:resource).permit(:id, :title, :description, :resource_topic_id, :attachment)
  end

end
