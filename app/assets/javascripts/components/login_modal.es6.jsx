/**
* @props style - button style
* @prop from_module - whether login is being rendered from module
* @prop from_map - whether login is being rendered from map
* @prop from_discussion - whether login is being rendered from create discussion
*/

var Modal = ReactBootstrap.Modal;

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._showForgotPasswordModal = this._showForgotPasswordModal.bind(this);
    this._attemptPasswordReset = this._attemptPasswordReset.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._successLogin = this._successLogin.bind(this);
    this._successResetEmail = this._successResetEmail.bind(this);
    this._error = this._error.bind(this);
    this._handleSignUp = this._handleSignUp.bind(this);
    this._renderLoginModal = this._renderLoginModal.bind(this);
    this.state = {
      showModal: false,
      email: "",
      password: "",
      btnStyle: this.props.style,
      forgotPasswordMode: false,
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
    this.setState({ forgotPasswordMode: false });
  }

  _showForgotPasswordModal() {
    this.setState({ forgotPasswordMode: true });
  }

  _attemptPasswordReset(e) {
    APIRequester.post(`/passwords/request_reset`,
      { email : this.state.email },
      this._successResetEmail
    );
  }

  _successResetEmail(msg) {
    this._closeModal();
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Password reset email has been sent.");
    window.location = location.pathname;
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _successLogin(msg) {
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
    APIRequester.post("/users/sign_in", loginFields, this._successLogin);
  }

  _handleSignUp(e) {
    window.location = "/sign_up";
  }

  _renderLoginModal() {
    let $display = null
    if (this.props.from_module) {
      $display = (<div className={this.state.btnStyle} onClick={this._openModal}>
                    <i className="fa fa-download fa-lg"></i>
                    <span>Download</span>
                  </div>)
    } else if (this.props.from_map) {
      $display = (<button className={this.state.btnStyle} onClick={this._openModal}>Join the Movement</button>)
    } else if (this.props.from_discussion) {
      $display = (<button className={this.state.btnStyle} onClick={this._openModal}>Create Discussion</button>)
    } else {
      $display = (<button className={this.state.btnStyle} onClick={this._openModal}>Log In</button>)
    }
    return (
      <div>
        {$display}
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
              <button className="btn btn-blue modal-btn pull-left" type="button" onClick={this._showForgotPasswordModal}>Forgot Password</button>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Log In</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }

  _renderForgotPasswordModal() {
    return (
      <div>
        <Modal className="modal" show={this.state.forgotPasswordMode} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Reset Your Password</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._attemptPasswordReset}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="email-input">Email Address</label>
                <input id="email-input" type="email" name="email" onChange={this._handleChange} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Send Password Reset Email</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }

  render () {
    if (this.state.forgotPasswordMode) {
      return (
        <div>
          { this._renderForgotPasswordModal() }
        </div>
      );
    } else {
      return (
        <div>
          { this._renderLoginModal() }
        </div>
      );
    }
  }
}

LoginModal.propTypes = {
  style: React.PropTypes.string.isRequired,
  from_module: React.PropTypes.bool,
  from_map: React.PropTypes.bool
};
