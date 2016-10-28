class RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, only: [:new, :create]

  def new
  end

  def create
    build_resource(sign_up_params)
    if resource.save
      sign_in(resource_name, resource)
      render_json_message(:ok, message: 'Account created!', to: user_path(resource.id))
    else
      clean_up_passwords resource
      render_json_message(:forbidden, errors: resource.errors.full_messages)
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :organization, :city, :country, :on_map,
               :email, :password, :password_confirmation)
    end
  end

end
