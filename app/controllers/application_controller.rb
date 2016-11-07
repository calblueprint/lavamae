class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :toast

  def render_json_message(status, options = {})
    render json: {
      data: options[:data],
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end

  def toast
    toast = {}
    flash.each do |type, message|
      if type == "alert" or type == "error"
        toast[:error] = message
        flash.discard(:error)
      else
        toast[:success] = message
        flash.discard(:success)
      end
    end
    toast
  end
end
