class RegistrationModal extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._error = this._error.bind(this);
    this._toLogin = this._toLogin.bind(this);
    this._attemptRegistration = this._attemptRegistration.bind(this);
    this._renderInput = this._renderInput.bind(this);
    this._handleMapCheckboxChange = this._handleMapCheckboxChange.bind(this);
    this._handleAdminCheckboxChange = this._handleAdminCheckboxChange.bind(this);
    this._handleVolunteerCheckboxChange = this._handleVolunteerCheckboxChange.bind(this);
    this._handleSeekingVolunteerCheckboxChange = this._handleSeekingVolunteerCheckboxChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._getLongitudeAndLatitudeAndSignUp = this._getLongitudeAndLatitudeAndSignUp.bind(this);
    this._startSignUpProcess = this._startSignUpProcess.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this.state = {
      admin_checked: false,
      map_checked: false,
      volunteer_checked: false,
      seeking_volunteer_checked: false,
      profile_pic: "",
      imagePreviewUrl: "",
      location: "",
    };
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _error(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  _toLogin() {
    window.location = "/about";
  }

  _attemptRegistration(response = null) {
    var locId = null;
    if (response) {
      locId = response.id;
    }
    const signupFields = {
      user: {
        is_admin: false,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        organization: this.state.organization,
        location_id: locId,
        on_map: this.state.map_checked,
        pending_admin: this.state.admin_checked,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        profile_pic: this.state.profile_pic,
        website: this.state.website,
        secondary_name: this.state.secondary_name,
        secondary_email: this.state.secondary_email,
        tertiary_name: this.state.tertiary_name,
        tertiary_email: this.state.tertiary_email,
        volunteer: this.state.volunteer_checked,
        seeking_volunteer: this.state.seeking_volunteer_checked,
      }
    };

    APIRequester.post("/sign_up", signupFields, (msg) => {});
  }

  _renderInput(name, label, type, placeholder, required=false) {
    let $requiredField;
    if (required) {
      $requiredField = (<label className="required-field">*</label>);
    }
    return (
      <div>
        <label htmlFor={name}>{label} {$requiredField}</label>
        <input onChange={this._handleChange} name={name}
          type={type} placeholder={placeholder} />
      </div>
    );
  }

  _handleMapCheckboxChange(e) {
    this.setState({ map_checked: e.target.checked });
  }

  _handleAdminCheckboxChange(e) {
    this.setState({ admin_checked: e.target.checked });
  }

  _handleVolunteerCheckboxChange(e) {
    this.setState({ volunteer_checked: e.target.checked });
  }

  _handleSeekingVolunteerCheckboxChange(e) {
    this.setState({ seeking_volunteer_checked: e.target.checked });
  }

  _handleSelect(e) {
    this.setState({ country: e.target.value });
  }

  _handleFileChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let attachment = e.target.files[0];
    reader.onload = (file) => {
      this.setState({
        profile_pic: file.target.result,
        imagePreviewUrl: reader.result,
      });
    }
    reader.readAsDataURL(attachment);
  }

  _getLongitudeAndLatitudeAndSignUp(loc) {
    this.setState({ location: loc }, function () {
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
    let loc = document.getElementById("my-address").value;
    if (this.state.map_checked) {
      if (loc.length == 0) {
        this._error("Please enter a location if you want to be on the map.");
      } else {
        this._getLongitudeAndLatitudeAndSignUp(loc);
      }
    } else if (this.state.volunteer_checked || this.state.seeking_volunteer_checked) {
      if (loc.length == 0) {
        this._error("Please enter a location if you want to volunteer/find volunteers in your area.");
      } else {
        this._getLongitudeAndLatitudeAndSignUp(loc);
      }
    } else if (loc.length != 0) {
      this._getLongitudeAndLatitudeAndSignUp(loc);
    } else {
      this._attemptRegistration();
    }
  }

  render() {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="profile-preview" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }
    return (
      <section className="signup">
        <div className="container signup-container">
          <div className="signup-row">
          <h1>Create a Profile</h1>
            <form>
              <label className="required-field">* Required</label>
              <div className="input-field">{ this._renderInput("first_name", "First Name", "text", "John", required=true) }</div>
              <div className="input-field">{ this._renderInput("last_name", "Last Name", "text", "Doe", required=true) }</div>
              <div className="input-field">{ this._renderInput("email", "Email", "text", "lavamae@gmail.com", required=true) }</div>
              <div className="input-field">{ this._renderInput("secondary_name", "Name of Secondary Contact", "text", "Jane Doe") }</div>
              <div className="input-field">{ this._renderInput("secondary_email", "Email of Secondary Contact", "text", "jane@gmail.com") }</div>
              <div className="input-field">{ this._renderInput("tertiary_name", "Name of Tertiary Contact", "text", "John Smith") }</div>
              <div className="input-field">{ this._renderInput("tertiary_email", "Email of Tertiary Contact", "text", "john@gmail.com") }</div>
              <div className="input-field">{ this._renderInput("password", "Password", "password", "", required=true) }</div>
              <div className="input-field">{ this._renderInput("password_confirmation", "Confirm Password", "password", "", required=true) }</div>
              <div className="input-field">{ this._renderInput("organization", "Organization", "text", "Lava Mae") }</div>
              <div className="input-field">{ this._renderInput("website", "Website", "text", "lavabae.org") }</div>
              <div className="input-field">
                <div>
                  <label htmlFor="location">Location</label>
                  <input id="my-address" name="location" type="text" />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="pin">Map Pin</label>
                <label className="control control--checkbox">Include me on the map!
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.map_checked}
                    onChange={this._handleMapCheckboxChange}
                    className="input-checkbox"/>
                  <div className="control__indicator"></div>
                </label>
              </div>
              <div className="input-field">
                <label htmlFor="volunteer">I want to...</label>
                <label className="control control--checkbox">Volunteer
                  <input type="checkbox"
                    name="volunteer"
                    checked={this.state.volunteer_checked}
                    onChange={this._handleVolunteerCheckboxChange}
                    className="input-checkbox"/>
                  <div className="control__indicator"></div>
                </label>
              </div>
              <div className="input-field">
                <label className="control control--checkbox"> Look for volunteers
                  <input type="checkbox"
                    name="seeking_volunteer"
                    checked={this.state.seeking_volunteer_checked}
                    onChange={this._handleSeekingVolunteerCheckboxChange}
                    className="input-checkbox"/>
                  <div className="control__indicator"></div>
                </label>
              </div>
              <div className="input-field">
                <label>Profile Picture</label><br></br>
                <label className="file-label" htmlFor="file-input">Choose a File</label>
                <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
                  <div className="imgPreview">
                    {$imagePreview}
                  </div>
              </div>
              <div>I want to...</div>
              <div className="input-field">
                <label className="control control--checkbox"> Request to be an Admin
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.admin_checked}
                    onChange={this._handleAdminCheckboxChange}
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
