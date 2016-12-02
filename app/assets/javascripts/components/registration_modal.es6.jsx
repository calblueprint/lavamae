/**
 * @prop countries - list of all countries
 */
class RegistrationModal extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._success = this._success.bind(this);
    this._error = this._error.bind(this);
    this._toLogin = this._toLogin.bind(this);
    this._attemptRegistration = this._attemptRegistration.bind(this);
    this._renderInput = this._renderInput.bind(this);
    this._handleCheckboxChange = this._handleCheckboxChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._getLongitudeAndLatitudeAndSignUp = this._getLongitudeAndLatitudeAndSignUp.bind(this);
    this._startSignUpProcess = this._startSignUpProcess.bind(this);
    this.state = {
      map_checked: false,
      location: "",
    };
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _success(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Sign up successful!");
    window.location = "/";
  }

  _error(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  _toLogin() {
    window.location = "/users/sign_in";
  }

  _attemptRegistration(response = null) {
    var locId = null;
    if (response) {
      locId = response.id;
    }
    const signupFields = {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        organization: this.state.organization,
        location_id: locId,
        on_map: this.state.map_checked,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      }
    };
    APIRequester.post("/sign_up", signupFields, this._success);
  }

  _renderInput(name, label, type, placeholder) {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input onChange={this._handleChange} name={name}
          type={type} placeholder={placeholder} />
      </div>
    );
  }

  _handleCheckboxChange(e) {
    this.setState({ map_checked: e.target.checked });
  }

  _handleSelect(e) {
    this.setState({ country: e.target.value });
  }

  _getLongitudeAndLatitudeAndSignUp() {
    this.setState({ location:  document.getElementById("my-address").value }, function () {
      geocoder = new google.maps.Geocoder();
      var address = this.state.location;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const locationFields = {
            location: {
              place: this.state.location,
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }
          };
          APIRequester.post("/locations", locationFields, this._attemptRegistration);
        }
        else {
          message = "Location invalid, please try again!";
          this._error(message);
        }
      }.bind(this));
    });
  }

  _startSignUpProcess(e) {
    if (this.state.map_checked) {
      this._getLongitudeAndLatitudeAndSignUp();
    } else {
      this._attemptRegistration();
    }
  }

  render() {
    return (
      <section className="signup">
        <div className="container signup-container">
          <div className="signup-row">
          <h3>Create an Account</h3>
            <form>
              <div className="input-field">{ this._renderInput("first_name", "First Name", "text", "Baby") }</div>
              <div className="input-field">{ this._renderInput("last_name", "Last Name", "text", "Panda") }</div>
              <div className="input-field">{ this._renderInput("email", "Email", "text", "panda@lavabae.org") }</div>
              <div className="input-field">{ this._renderInput("password", "Password", "password", "") }</div>
              <div className="input-field">{ this._renderInput("password_confirmation", "Confirm Password", "password", "") }</div>
              <div className="input-field">{ this._renderInput("organization", "Organization", "text", "lavabae++") }</div>
              <div className="input-field">
                <div>
                  <label htmlFor="location">Location</label>
                  <input id="my-address" name="location" type="text" placeholder="Berkeley, CA, United States" />
                </div>
              </div>

              <div className="input-field">
                <label className="control control--checkbox"> Include me on the map!
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.map_checked}
                    onChange={this._handleCheckboxChange}
                    className="input-checkbox"/>
                  <div className="control__indicator"></div>
                </label>
              </div>

              <button className="btn btn-blue" name="submit" type="button"
                onClick={this._startSignUpProcess}>Create Account</button>
            </form>
          <div className="login-link">
            <a onClick={this._toLogin} >Already have an account?</a>
          </div>
        </div>
      </div>
      </section>
    );
  }
}

RegistrationModal.propTypes = {
    countries: React.PropTypes.array.isRequired
};
