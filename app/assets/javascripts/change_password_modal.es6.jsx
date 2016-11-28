/**
* @prop user_id - the id of the user
* @prop reset_token - the password reset token if this form is in reset mode
* @prop show_modal - if true, start with modal open
*/
class ChangePasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._attemptPasswordUpdate = this._attemptPasswordUpdate.bind(this);
    this.state = {
      old_password: "",
      password: "",
      password_confirmation: "",
      show_modal: this.props.show_modal || false
    };
  }

  _openModal() {
    this.setState({ show_modal: true });
  }

  _closeModal() {
    this.setState({ show_modal: false });
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _attemptPasswordUpdate(e) {
    e.preventDefault();
    if (this.props.reset_token == null) {
      const passwordUpdateData = {
        old_password: this.state.old_password,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      };
      APIRequester.put(`/passwords/${this.props.user_id}`, passwordUpdateData, (msg) => {} );
    } else {
      const passwordResetData = {
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        reset_password_token  : this.props.reset_token,
      };
      APIRequester.post("/passwords/reset", passwordResetData, (msg) => {} );
    }
  }

  render() {
    var old_password = <div></div>;
    if (this.props.reset_token == null) {
      old_password = (
        <fieldset className="input-container">
          <label>Current password</label>
          <input type="password" ref="old_password"
            name="old_password"
            onChange={this._handleChange} />
        </fieldset>
      );
    }

    return (
      <div>
        <button className={this.state.btnStyle} onClick={this._openModal}>Change Password</button>
        <Modal className="modal" show={this.state.show_modal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._attemptPasswordUpdate}>
            <Modal.Body>
              {old_password}
              <fieldset>
                <label>New password</label>
                <input type="password" ref="new_password"
                  name="password"
                  onChange={this._handleChange} />
              </fieldset>
              <fieldset>
                <label>Confirm new password</label>
                <input type="password" ref="password_confirmation"
                  name="password_confirmation"
                  onChange={this._handleChange} />
              </fieldset>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Cancel</button>
              <button className="btn btn-blue modal-btn" type="submit">Submit</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}

ChangePasswordModal.propTypes = {
  user_id     : React.PropTypes.number,
  reset_token : React.PropTypes.string,
  show_modal  : React.PropTypes.bool
};
