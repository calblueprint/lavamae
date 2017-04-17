/**
  * @prop users - list of all users
  * @prop user_id - user id for the current user
  * @prop default_image - default profile image url
  */

class DeleteUsers extends React.Component {
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
      return (
        <DeleteUser
          key = {user.id}
          admin_id = {this.state.adminId}
          user = {user}
          default_image = {this.props.default_image}
        />
      )
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

DeleteUsers.propTypes = {
  users: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
  default_image: React.PropTypes.string.isRequired
};

/**
  * @prop admin_id - id of admin approving or rejecting the pending user
  * @prop pending_user - user whose admin_approval_state is set to "pending"
  */

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
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

  _handleDelete() {
    APIRequester.delete(`/users/${this.props.user.id}`, {}, this._successDelete);
  }

  render() {
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
          <button className="btn btn-sm btn-outline" onClick={this._handleDelete}>
            <i className="fa fa-close"></i> Delete
          </button>
        </div>
      </div>
    );
  }

}

DeleteUser.propTypes = {
  admin_id: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired,
  default_image: React.PropTypes.string.isRequired
};
