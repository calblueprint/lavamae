/**
  * @prop pending_users
  */

class PendingMapUsers extends React.Component {
  constructor(props) {
    super(props);
    this._handleApprove = this._handleApprove.bind(this);
    this._handleReject = this._handleReject.bind(this);
    this.state = {
      users: this.props.pending_users,
      approved_users: {},
      rejected_users: {},
    }
  }

  _handleApprove(user) {
    this.state.approved_users[user.id] = {map_approval_state: 1}
  }

  _handleReject(user) {
    this.state.rejected_users[user.id] = {map_approval_state: 2}
  }

  _handleUpdate() {

  }

  _renderUsers() {
    if (this.state.users == undefined) {
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
        "Users Pending Map Approval"
        {this._renderUsers()}
        <button className="btn btn-outline" onClick={this._handleUpdate}>Update</button>
      </div>
    );
  }

}
1
PendingMapUsers.propTypes = {
  pending_users: React.PropTypes.array.isRequired,
}
