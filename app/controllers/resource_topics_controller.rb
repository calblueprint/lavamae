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
      redirect_to resource_topics_path
    else
      render "new"
    end
  end

  def edit
  end

  def admin_edit
    @modules = ResourceTopic.all
  end

  def admin_destroy
    @resource_topic = ResourceTopic.find(params[:resource_topic_id])
    if @resource_topic.destroy
      render_json_message(:ok, message: 'Deleted module!')
    else
      render_json_message(:forbidden, errors: @resource_topic.errors.full_messages)
    end
  end

  def update
    @resource_topic = ResourceTopic.find(params[:id])
    if @resource_topic.update(update_params)
      render_json_message(:ok, message: "Module name successfully updated!")
    else
      render_json_message(:forbidden, errors: resource_topic.errors.full_messages)
    end
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
    params.require(:resource_topic).permit(:name)
  end

  def update_params
    params.permit(:id, :name)
  end

end
