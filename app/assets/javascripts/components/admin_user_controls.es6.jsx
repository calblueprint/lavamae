/**
  * @prop users - list of all users
  * @prop user_id - user id for the current user
  * @prop default_image - default profile image url
  */

class AdminUserControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      adminId: this.props.user_id,
    }
  }

  _renderUsers() {
    if (!this.state.users) {
      return
    }

    return this.state.users.map((user) => {
      if (user.id != this.state.adminId) {
        return (
          <UserControl
            key = {user.id}
            admin_id = {this.state.adminId}
            user = {user}
            default_image = {this.props.default_image}
          />
        )
      }
    });
  }

  render() {
    return (
      <div>
        {this._renderUsers()}
      </div>
    );
  }
}

AdminUserControls.propTypes = {
  users: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
  default_image: React.PropTypes.string.isRequired
};

/**
  * @prop admin_id - id of admin deleting users
  * @prop user - user to delete
  * @prop default_image - default profile image url
  */

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this._handleApprove = this._handleApprove.bind(this);
    this._handleReject = this._handleReject.bind(this);
    this._successApproval = this._successApproval.bind(this);
    this._successReject = this._successReject.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._successDelete = this._successDelete.bind(this);
    this._setProfilePic = this._setProfilePic.bind(this);
    this._fetchProfilePic = this._fetchProfilePic.bind(this);
    this.state = {
      profilePic: this.props.default_image,
    };
  }

  componentDidMount() {
    this._fetchProfilePic();
  }

  _setProfilePic(data) {
    if (data.profile_pic.thumb.url) {
      this.setState({ profilePic: data.profile_pic.thumb.url });
    }
  }

  _fetchProfilePic() {
    APIRequester.get(`/api/users/${this.props.user.id}/profilepic`, this._setProfilePic);
  }

  _successDelete(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("User deleted.");
    window.location = location.pathname;
  }

  _successApproval(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Admin approved!");
    window.location = location.pathname;
  }

  _successReject(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("User admin status revoked.");
    window.location = location.pathname;
  }

  _handleApprove() {
    approvalFields = {
      admin_approval_state: 1,
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.user.id}/admin_approval`, approvalFields, this._successApproval);
  }

  _handleReject() {
    rejectionFields = {
      admin_approval_state: 2,
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.user.id}/admin_approval`, rejectionFields, this._successReject);
  }

  _handleDelete() {
    APIRequester.delete(`/users/${this.props.user.id}`, {}, this._successDelete);
  }

  render() {
    if (this.props.user.is_admin) {
    var button = (
      <button className="btn btn-sm btn-outline" onClick={this._handleReject}>
        <i className="fa fa-close"></i> Revoke Admin
      </button>
      )
    } else {
      var button = (
        <button className="btn btn-sm btn-blue" onClick={this._handleApprove}>
            <i className="fa fa-check"></i> Make Admin
          </button>
        )
    }
    return (
      <div className="approval">
        <div className="user-container">
          <div className="user-picture">
            <a href={'/users/' + this.props.user.id}>
              <img src={this.state.profilePic} />
            </a>
          </div>
        </div>
        <p className="approval-name">
          <a href={'/users/' + this.props.user.id}>
          { this.props.user.first_name } { this.props.user.last_name }
          </a>
        </p>
        <p className="approval-name">
          <a href={'/users/' + this.props.user.id}>
          { this.props.user.email }
          </a>
        </p>
        <div className="approval-btns">
          {button}
          <button className="btn btn-sm btn-outline" onClick={this._handleDelete}>
            <i className="fa fa-close"></i> Delete
          </button>
        </div>
      </div>
    );
  }
}

UserControl.propTypes = {
  admin_id: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired,
  default_image: React.PropTypes.string.isRequired
};
