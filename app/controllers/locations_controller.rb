class LocationsController < ApplicationController
  def create
    @location = Location.find_by(place: location_params[:place])
    if @location.nil?
      @location = Location.create(location_params)
    end
    render json: @location
  end

  private
    def location_params
      params.require(:location).permit(:place, :lat, :lng)
    end
end
