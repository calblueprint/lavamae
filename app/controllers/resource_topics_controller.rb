class ResourceTopicsController < ApplicationController
  def index
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
    @resource_topic = ResourceTopic.find(params[:id])
    @resource_topic.update(resource_topic_params)
    redirect_to resource_topic_path
  end

  def show
    @resource_topic = ResourceTopic.find(params[:id])
  end

  def destroy
    @resource_topic = ResourceTopic.find(params[:id])
    @resource_topic.destroy
    redirect_to resource_topic_path
  end

  private
    def resource_topic_params
      params.require(:resource_topic).permit(:name, :description, :attachment)
    end
end
