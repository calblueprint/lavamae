/**
 * @prop countries - list of all countries
 */
class RegistrationModal extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._success = this._success.bind(this);
    this._toLogin = this._toLogin.bind(this);
    this._attemptRegistration = this._attemptRegistration.bind(this);
    this._renderInput = this._renderInput.bind(this);
    this._handleCheckboxChange = this._handleCheckboxChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this.state = {
      map_checked: false,
      countries: this.props.countries || [],
      country: this.props.countries[0] || "",
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

  _toLogin() {
    window.location = "/users/sign_in";
  }

  _attemptRegistration(e) {
    const signupFields = {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        organization: this.state.organization,
        city: this.state.city,
        country: this.state.country,
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
        <label htmlFor={name}>{label}:</label>
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

  render() {
    const countryOptions = this.state.countries.map((country) => {
            return (
                <option key={country}>{country}</option>
            );
        });

    return (
      <div>
        <div>
          <h1>New Account</h1>
          </div>
            <form>
              { this._renderInput("first_name", "First Name", "text", "Baby") }
              { this._renderInput("last_name", "Last Name", "text", "Panda") }
              { this._renderInput("email", "Email", "text", "panda@lavabae.org") }
              { this._renderInput("password", "Password", "password", "") }
              { this._renderInput("password_confirmation", "Confirm Password", "password", "") }
              { this._renderInput("organization", "Organization", "text", "lavabae++") }
              { this._renderInput("city", "City", "text", "Berkeley") }

              <div>
                <label>
                  Country:
                  <select name="country" defaultValue="None" onChange={this._handleSelect} >
                    {countryOptions}
                  </select>
                </label>
              </div>

              <div>
                <label>
                  Appear on map:
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.map_checked}
                    onChange={this._handleCheckboxChange}
                    className="input-checkbox"/>
                </label>
              </div>

              <input name="submit" type="button" value="Create Account"
                onClick={this._attemptRegistration} />
            </form>
          <div>
          <a onClick={this._toLogin} >Already have an account?</a>
        </div>
      </div>
    );
  }
}
