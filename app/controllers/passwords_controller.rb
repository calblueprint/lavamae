class PasswordsController < ApplicationController
  before_action :authenticate_user!, except: [:request_reset, :reset]

  def update
    user = User.find(params[:id])
    password_errors = accumulate_password_errors

    unless user.valid_password?(params[:old_password])
      render_json_message(:forbidden, errors: ["Current password incorrect."])
      return
    end

    if !password_errors.blank?
      render_json_message(:forbidden, errors: password_errors)
    elsif user.update(update_params.except!(:old_password))
      render_json_message(:ok, message: "Password updated", to: user_path(user.id))
      sign_in(user, bypass: true)
    else
      render_json_message(:internal_server_error, errors: ["An unknown error occurred."])
    end
  end

  def request_reset
    email = request_reset_params[:email]
    user = User.find_by_email(email)
    if !user.nil? && user.send_reset_password_instructions
      render_json_message(:ok)
      return
    end
    render_json_message(:internal_server_error, errors: ["An unknown error occurred."])
  end

  def reset
    password_errors = accumulate_password_errors
    unless password_errors.blank?
      render_json_message(:forbidden, errors: password_errors)
      return
    end

    resource = User.reset_password_by_token reset_params

    if !resource.errors.messages.blank?
      errors = resource.errors.messages[:reset_password_token].map do |error|
        "Reset token " + error
      end
      render_json_message(:forbidden, errors: errors)
    else
      render_json_message(:ok, message: "Password successfully reset.", to: root_path)
    end
  end

  private

  def update_params
    params.permit(:old_password, :password, :password_confirmation)
  end

  def request_reset_params
    params.permit(:email)
  end

  def reset_params
    params.permit(:password, :password_confirmation, :reset_password_token)
  end

  def accumulate_password_errors
    errors = []
    if params[:password].nil? || params[:password].nil?
      errors.push("Passwords not provided.")
    elsif params[:password] != params[:password_confirmation]
      errors.push("Passwords do not match.")
    elsif params[:password].length < Devise.password_length.min
      errors.push("New password is too short.")
    elsif params[:password].length > Devise.password_length.max
      errors.push("New password is too long.")
    end
  end
end
