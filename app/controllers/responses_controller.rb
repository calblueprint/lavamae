class ResponsesController < ApplicationController

    before_action :get_response, only: [:show, :edit, :update, :destroy]

  def index
    @responses = Response.all
  end

  def create
    response = Response.new(response_params)
    response.save
    redirect_to responses_path
  end

  def new
    # nothing here
  end

  def show 
    # work done in get_response
  end

  def edit
  end

  def update
  end

  def destroy
    @response.destroy
    redirect_to responses_path
  end

  private
    def response_params
        params.require(:response).permit(:content)
    end

    def get_response
        @response = Response.find(params[:id])
    end

end
