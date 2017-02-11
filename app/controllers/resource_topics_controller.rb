class ResourceTopicsController < ApplicationController
  def index
    @resource_topics = ResourceTopic.all
  end

  def new
    @resource_topic = ResourceTopic.new
  end

  def create
  @resource_topic = ResourceTopic.new(resource_topic_params)

    if @resource_topic.save
      flash[:success] = "#{@resource_topic.name} was successfully uploaded!"
      redirect_to resource_topics_path
    else
      flash.now[:error] = @resource_topic.errors.full_messages.first
      render "new"
    end
  end

  def edit
  end

  def update
  end

  def show
    @resource_topic = ResourceTopic.find(params[:id])
    @resources = @resource_topic.resources
    render json: @resources
  end

  def destroy
    @resource_topic = ResourceTopic.find(params[:id])
    @num_resources = @resource_topic.resources.length
    if @num_resources != 0
      flash[:error] = "#{@resource_topic.name} still has #{@num_resources} resources"
      redirect_to resource_topics_path
    else
      @resource_topic.destroy
      redirect_to resource_topics_path
    end
  end

  private
  def resource_topic_params
    params.require(:resource_topic).permit(:name, :description, :attachement)
  end

end
