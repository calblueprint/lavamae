/**
  * @prop pending_users - list of users with map_approval_state set to "pending"
  * @prop user_id - user id for the current user
  */

class PendingMapUsers extends React.Component {
  constructor(props) {
    super(props);
    this._handleApprove = this._handleApprove.bind(this);
    this._handleReject = this._handleReject.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this.state = {
      users: this.props.pending_users,
      admin_id: this.props.user_id,
      modified_users: {},
    }
  }

  _handleApprove(user) {
    new_modified_users = this.state.modified_users
    new_modified_users[user.id] = {map_approval_state: 'approved'}
    this.setState({modified_users: new_modified_users})
  }

  _handleReject(user) {
    new_modified_users = this.state.modified_users
    new_modified_users[user.id] = {map_approval_state: 'rejected'}
    this.setState({modified_users: new_modified_users})
  }

  _success(msg) {
    toastr.success("Update successful!");
    window.location = location.pathname;
  }

  _handleUpdate() {
    approvalFields = {
      modified_users: this.state.modified_users,
      admin_id: this.props.user_id
    }
    APIRequester.put('/users/update_map_approval', approvalFields, this._success);
  }

  _renderUsers() {
    if (!this.state.users) {
      return
    }

    return this.state.users.map((pending_user) => {
      return (
        <ApproveUser
          key = {pending_user.id}
          pending_user = {pending_user}
          _handleApprove = {this._handleApprove}
          _handleReject = {this._handleReject}
        />
      )
    });
  }

  render() {
    return (
      <div>
        {this._renderUsers()}
        <button className="btn btn-outline" onClick={this._handleUpdate}>Update</button>
      </div>
    );
  }

}

PendingMapUsers.propTypes = {
  pending_users: React.PropTypes.array.isRequired,
  user_id: React.propTypes.number.isRequired,
}
