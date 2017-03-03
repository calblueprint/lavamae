module Api
  class ResourceTopicsController < Api::BaseController
    def index
      resource_topics = ResourceTopic.all.order('created_at')
      render json: resource_topics
    end
  end
end
