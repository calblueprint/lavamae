class AdminTagsController < ApplicationController

  # Destroys existing tag set and creates new set of discussion tags
  def save
  	AdminTag.destroy_all
  	params[:tags].each do |t|
  		AdminTag.create(name: t.downcase)
  	end
  	redirect_to discussions_path
  end

    private
  	def tag_params
  		params.permit(tags: [])
  	end

end
