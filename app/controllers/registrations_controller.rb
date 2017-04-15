class RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, only: [:new, :create]

  def new
  end

  def create
    build_resource(sign_up_params)
    if resource.save
      # sign_in(resource_name, resource)
      email = sign_up_params[:email]
      user = User.find_by_email(email)
      if !user.nil?
        render_json_message(:ok, message: 'Account Pending; please check your email to confirm your account!', to: root_path)
      else
        render_json_message(:internal_server_error, errors: ["An unknown error occurred."])
      end
    else
      clean_up_passwords resource
      if resource.on_map && !resource.location_id
        render_json_message(:forbidden, errors: resource.errors.full_messages + ["Please choose a location."])
      else
        render_json_message(:forbidden, errors: resource.errors.full_messages)
      end
    end
  end

  def password_reset
    @token = params[:reset_password_token]
  end

  def login
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :organization, :location_id, :on_map, :pending_admin,
               :email, :password, :password_confirmation, :profile_pic, :website, :secondary_name, :secondary_email, :tertiary_name, :tertiary_email, :volunteer, :seeking_volunteer)
    end
  end

end
