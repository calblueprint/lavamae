/**
* @props style - button style
* @props user_id - user's id
* @props first_name - user's current first name
* @props last_name - user's current last name
* @props email - user's current email
* @props organization - user's current orgnization
* @props city - user's current city
* @props country - user's current country
* @props countries - list of countries
* @props on_map - true if user appears on map
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
    this._attemptSave = this._attemptSave.bind(this);
    this.state = {
      showModal: false,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      organization: this.props.organization,
      city: this.props.city,
      country: this.props.country,
      countries: this.props.countries || [],
      on_map: this.props.on_map,
      btnStyle: this.props.style
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

  _attemptSave(e) {
    const userFields = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      organization: this.state.organization,
      city: this.state.city,
      country: this.state.country,
      on_map: this.state.on_map,
    };
    APIRequester.put(`/users/${this.props.user_id}`, userFields, this._success);
  }

  render () {
    const countryOptions = this.state.countries.map((country) => {
      if (country != "country_name") {
        return (
          <option key={country} value={country}>{country}</option>
        );
      }
    });

    return (
      <div>
        <button className={this.state.btnStyle} onClick={this._openModal}>Edit</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Account Information</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._attemptSave}>
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
                <label htmlFor="city">City</label>
                <input id="city-input" type="city" name="city" onChange={this._handleChange}
                       placeholder="Berkeley" defaultValue={this.props.city} />
              </div>
              <div>
                <label>
                  Country:
                  <select name="country" value={this.state.country} onChange={this._handleSelect} >
                    {countryOptions}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Appear on map:
                  <input type="checkbox"
                    name="on_map"
                    checked={this.state.on_map}
                    onChange={this._handleCheckboxChange}
                    className="input-checkbox"/>
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Cancel</button>
              <button className="btn btn-blue modal-btn" type="submit">Save Changes</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

EditProfileModal.propTypes = {
  style        : React.PropTypes.string.isRequired,
  user_id      : React.PropTypes.number.isRequired,
  first_name   : React.PropTypes.string.isRequired,
  last_name    : React.PropTypes.string.isRequired,
  email        : React.PropTypes.string.isRequired,
  organization : React.PropTypes.string.isRequired,
  city         : React.PropTypes.string.isRequired,
  country      : React.PropTypes.string.isRequired,
  countries    : React.PropTypes.array.isRequired,
  on_map       : React.PropTypes.bool.isRequired,
};