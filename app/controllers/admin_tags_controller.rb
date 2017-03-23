class AdminTagsController < ApplicationController

  def create
  	tag = AdminTag.create(tag_params)
  	redirect_to discussions_path
  end

    private
  	def tag_params
  		params.require(:tag).permit(:name)
  	end

end
