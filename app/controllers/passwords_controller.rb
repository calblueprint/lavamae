class PasswordsController < Api::BaseController
  before_action :authenticate_user!, except: [:request_reset, :reset]
end
