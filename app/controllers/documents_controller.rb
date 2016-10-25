class DocumentsController < ApplicationController
  def index
  	@documents = Document.all
  end

  def new
  	@document = Document.new
  end

  def create
	@document = Document.new(document_params)

    if @document.save
      redirect_to documents_path
    else
      render "new"
    end
  end

  def destroy
  	@document = Document.find(params[:id])
  	@document.destroy
  	redirect_to documents_path
  end

  private
	def document_params
	  params.require(:document).permit(:title, :description, :attachment)
	end

end
