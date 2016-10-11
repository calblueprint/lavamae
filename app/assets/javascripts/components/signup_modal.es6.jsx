var Modal = ReactBootstrap.Modal;

class SignupModal extends React.Component {

  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._success = this._success.bind(this);
    this.state = {
      showModal: false,
      email: "",
      password: ""
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
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Sign-up successful!");
    window.location = "/";
  }

  _handleLogin(e) {
    e.preventDefault();
    const loginFields = {
      user: {
        email: this.state.email,
        password: this.state.password,
      }
    };
    APIRequester.post("/users", loginFields, this._success);
  }

  render () {
    return (
      <div>
        <button className="btn btn-transparent" onClick={this._openModal}>Sign Up</button>
        <Modal
          className="modal"
          show={this.state.showModal}
          onHide={this._closeModal}
        >
          <Modal.Header>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._handleLogin}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="email-input">Email Address</label>
                <input id="email-input" type="email" name="email" onChange={this._handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password-input">Password (8 characters minimum)</label>
                <input id="password-input" type="password" name="password" onChange={this._handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password-input">Password Confirmation</label>
                <input id="password-input" type="password" name="password" onChange={this._handleChange} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Sign Up</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}
