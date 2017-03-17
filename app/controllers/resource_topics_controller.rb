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
    if @resource_topic.update(resource_topic_params)
      render_json_message(:ok, to: resource_topics_path)
    else
      render_json_message(:forbidden, message: "Error: Module not deleted.", to: resource_topics_path)
    end
  end

  def destroy
    @resource_topic = ResourceTopic.find(params[:id])
    if @resource_topic.destroy
      render_json_message(:ok, message: "Delete successful!", to: resource_topics_path)
    else
      render_json_message(:forbidden, message: "Error: Module not deleted.", to: resource_topics_path)
    end
  end

  private

  def resource_topic_params
    params.require(:resource_topic).permit(:name, :description, :attachment)
  end
end
