class LocationsController < ApplicationController
  def create
    puts "==========DEBUG: ACCESSING LOCATION CONTROLLER ================="
    @location = Location.find_by(place: location_params[:place])
    if @location.nil?
      @location = Location.create(location_params)
    end
    # render_json_message(:ok, data: @location)
    render json: @location
  end

  private
    def location_params
      params.require(:location).permit(:place, :lat, :lng)
    end
end
