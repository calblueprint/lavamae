/**
* @prop model - the type of model this user has (admin or teacher)
* @prop user_id - the id of the user
*/
class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._attemptPasswordUpdate = this._attemptPasswordUpdate.bind(this);
    this.state = {
      old_password: "",
      password: "",
      password_confirmation: ""
    };
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
    APIRequester.put(`/passwords/${this.props.user_id}`, passwordData, (msg) => {} );
  }

    render() {
        var old_password = <div></div>;
          old_password = (
            <fieldset>
              <label>Current password</label>
              <input type="password" ref="old_password"
                name="old_password"
                onChange={this._handleChange} />
            </fieldset>
          );

        return (
            <div>
              <h1>Change Password</h1>
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
              <button type="button" onClick={this._attemptPasswordUpdate}>
                  Submit
              </button>
            </div>
      )
    }
}

ChangePasswordForm.propTypes = {
    model       : React.PropTypes.string,
    user_id     : React.PropTypes.number,
};
