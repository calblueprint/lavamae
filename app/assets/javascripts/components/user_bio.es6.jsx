/**
 * @prop user - passing in the profile page user
 * @prop current_user - passing in the current user viewing the profile page
**/

class UserBio extends React.Component {
  constructor(props) {
    super(props);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this.state = {
      bio: this.props.user.bio,
    }
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this.setState({ show_form: true });
  }

  _successfulSave() {
    this.setState({ show_form: false });
  }

  _saveForm(e) {
    e.preventDefault();
    this.setState({ bio: $("#user_bio").val() }, () => {
                      const userFields = {
                        user: {
                          bio: this.state.bio
                        }
                      };
                      APIRequester.put(`/users/${this.props.user.id}`, userFields, this._successfulSave);
                    });
  }

  renderForm () {
    return (
      <div>
        <div className="input-field">
          <textarea name = "bio" id="user_bio" defaultValue={this.state.bio}></textarea>
        </div>
        <br></br>
        <button className="btn btn-blue btn-sm save" onClick={this._saveForm}>Save</button>
        <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
      </div>
    )
  }

  renderContent() {
    let $display = null;
    let userBio = this.state.bio;
    if (this.props.user.id == this.props.current_user.id) {
      if (userBio) {
        $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Edit</button>);
      } else {
        $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Add Bio</button>);
      }
    }
    return (
      <div>
      <p className="bio-description wordwrap">{this.state.bio}</p>
      {$display}
      </div>
    )
  }

  render() {
    let renderedContent;
    if (this.state.show_form) {
      return this.renderForm();
    } else {
      return this.renderContent();
    }
  }
}
