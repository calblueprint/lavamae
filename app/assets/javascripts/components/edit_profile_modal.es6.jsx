/**
* @props user_id - user's id
* @props first_name - user's current first name
* @props last_name - user's current last name
* @props email - user's current email
* @props organization - user's current orgnization
* @props location - location city, state, country string
* @props website - user's website
* @props on_map - true if user appears on map
* @props profile_pic - path of user's profile picture
*/

var Modal = ReactBootstrap.Modal;

class EditProfileModal extends React.Component {

  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._success = this._success.bind(this);
    this._error = this._error.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._handleCheckboxChange = this._handleCheckboxChange.bind(this);
    this._getLongitudeAndLatitudeAndSignUp = this._getLongitudeAndLatitudeAndSignUp.bind(this);
    this._startSignUpProcess = this._startSignUpProcess.bind(this);
    this._attemptSave = this._attemptSave.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this.state = {
      showModal: false,
      // TODO (amy): fix nested profile_pic prop
      profile_pic: this.props.profile_pic,
      imagePreviewUrl: this.props.profile_pic.profile_pic.url,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      organization: this.props.organization,
      location: this.props.location,
      website: this.props.website,
      on_map: this.props.on_map,
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _success(msg) {
    this._closeModal();
    window.location = location.pathname;
  }

  _error(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  _handleSelect(e) {
    this.setState({ country: e.target.value });
  }

  _handleCheckboxChange(e) {
    this.setState({ on_map: e.target.checked });
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
          APIRequester.post("/locations", locationFields, this._attemptSave);
        }
        else {
          message = "Location invalid, please try again!";
          this._error(message);
        }
      }.bind(this));
    });
  }

  _startSignUpProcess(e) {
    let loc = document.getElementById("my-edit-address").value;
    if (this.state.on_map) {
      if (loc.length == 0) {
        this._error("Please enter a location if you want to be on the map.");
      } else {
        this._getLongitudeAndLatitudeAndSignUp(loc);
      }
    } else if (loc.length != 0) {
      this._getLongitudeAndLatitudeAndSignUp(loc);
    } else {
      this._attemptSave();
    }
  }

  _attemptSave(response = null) {
    var userFields = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      on_map: this.state.on_map,
      profile_pic: this.state.profile_pic,
    };

    if (this.state.organization) {
      userFields.organization = this.state.organization;
    }

    if (this.state.website) {
      userFields.website = this.state.website;
    }

    var locId = null;
    if (response) {
      locId = response.id;
      userFields["location_id"] = locId;
    }
    APIRequester.put(`/users/${this.props.user_id}`, userFields, this._success);
  }

  componentDidUpdate() {
    var address = (document.getElementById('my-edit-address'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }
      });
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
    console.log('profile_pic state set')
    reader.readAsDataURL(attachment);
  }

  render () {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="profile-preview" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }
    return (
      <div>
        <button className="btn btn-sm btn-blue" onClick={this._openModal}>Edit</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Account Information</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="first_name">First Name</label>
                <input id="first-name-input" type="first_name" name="first_name" onChange={this._handleChange}
                       placeholder="Baby" defaultValue={this.props.first_name} />
              </div>
              <div className="input-field">
                <label htmlFor="last_name">Last Name</label>
                <input id="last-name-input" type="last_name" name="last_name" onChange={this._handleChange}
                       placeholder="Panda" defaultValue={this.props.last_name} />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email Address</label>
                <input id="email-input" type="email" name="email" onChange={this._handleChange}
                       placeholder="panda@lavamae.org" defaultValue={this.props.email} />
              </div>
              <div className="input-field">
                <label htmlFor="organization">Organization</label>
                <input id="organization-input" type="organization" name="organization" onChange={this._handleChange}
                       placeholder="Lava Bae" defaultValue={this.props.organization} />
              </div>
              <div className="input-field">
                <label htmlFor="organization">Website</label>
                <input id="website-input" type="website" name="website" onChange={this._handleChange}
                       placeholder="lavabae.org" defaultValue={this.props.website} />
              </div>
              <div className="input-field">
                <div>
                  <label htmlFor="location">Location</label>
                  <input id="my-edit-address" name="location" type="text" placeholder="Berkeley, CA, United States" defaultValue={this.state.location} />
                </div>
              </div>
              <div className="input-field">
                <label className="control control--checkbox"> Include me on the map!
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.on_map}
                    onChange={this._handleCheckboxChange}
                    className="input-checkbox"/>
                  <div className="control__indicator"></div>
                </label>
              </div>
              <div className="input-field">
                <label class>Profile Picture</label><br></br>
                <label className="file-label" htmlFor="file-input">Choose an Image</label>
                <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
                  <div className="imgPreview">
                    {$imagePreview}
                  </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Cancel</button>
              <button type="button" className="btn btn-blue modal-btn" onClick={this._startSignUpProcess}>Save Changes</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

EditProfileModal.propTypes = {
  user_id         : React.PropTypes.number.isRequired,
  first_name      : React.PropTypes.string.isRequired,
  last_name       : React.PropTypes.string.isRequired,
  email           : React.PropTypes.string.isRequired,
  organization    : React.PropTypes.string,
  location        : React.PropTypes.string,
  website         : React.PropTypes.string,
  on_map          : React.PropTypes.bool,
  profile_pic     : React.PropTypes.object.isRequired,
};
