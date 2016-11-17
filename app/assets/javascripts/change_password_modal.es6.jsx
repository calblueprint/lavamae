/**
* @prop model - the type of model this user has (admin or teacher)
* @prop user_id - the id of the user
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
      password_confirmation: ""
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

  _attemptPasswordUpdate(e) {
    const passwordData = {
      old_password: this.state.old_password,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      model: this.props.model
    };
    console.log(passwordData);
    APIRequester.put(`/passwords/${this.props.user_id}`, passwordData, (msg) => {} );
  }

    render() {
        return (
            <div>
              <button className={this.state.btnStyle} onClick={this._openModal}>Change Password</button>
              <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
                <Modal.Header>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <form onSubmit={this._attemptPasswordUpdate}>
                  <Modal.Body>
                    <fieldset>
                        <label>Current password</label>
                        <input type="password" ref="old_password"
                            name="old_password"
                            onChange={this._handleChange} />
                    </fieldset>
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
    model       : React.PropTypes.string,
    user_id     : React.PropTypes.number,
};
