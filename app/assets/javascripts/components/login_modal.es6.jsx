/**
* @props style - button style
*/

var Modal = ReactBootstrap.Modal;

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._success = this._success.bind(this);
    this._error = this._error.bind(this);
    this._handleSignUp = this._handleSignUp.bind(this);
    this.state = {
      showModal: false,
      email: "",
      password: "",
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
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Log-in successful!");
    window.location = location.pathname;
  }

  _error(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  _handleLogin(e) {
    e.preventDefault();
    const loginFields = {
      user: {
        email: this.state.email,
        password: this.state.password,
      }
    };
    APIRequester.post("/users/sign_in", loginFields, this._success);
  }

  _handleSignUp(e) {
    window.location = "/sign_up";
  }

  render () {
    return (
      <div>
        <button className={this.state.btnStyle} onClick={this._openModal}>Log In</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._handleLogin}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="email-input">Email Address</label>
                <input id="email-input" type="email" name="email" onChange={this._handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password-input">Password</label>
                <input id="password-input" type="password" name="password" onChange={this._handleChange} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-blue pull-left" type="button" onClick={this._handleSignUp}>Sign Up</button>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Log In</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  style: React.PropTypes.string.isRequired,
};
