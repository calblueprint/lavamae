/**
  * @prop pending_users - list of users with map_approval_state set to "pending"
  * @prop user_id - user id for the current user
  */

class PendingMapUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.pending_users,
      admin_id: this.props.user_id,
    }
  }

  _renderUsers() {
    if (!this.state.users) {
      return
    }

    return this.state.users.map((pending_user) => {
      return (
        <ApproveUser
          key = {pending_user.id}
          admin_id = {this.state.admin_id}
          pending_user = {pending_user}
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

PendingMapUsers.propTypes = {
  pending_users: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
};

/**
  * @prop admin_id - id of admin approving or rejecting the pending user
  * @prop pending_user - user whose map_approval_state is set to "pending"
  */

class ApproveUser extends React.Component {
  constructor(props) {
    super(props);
    this._handleApprove = this._handleApprove.bind(this);
    this._handleReject = this._handleReject.bind(this);
    this._successApproval = this._successApproval.bind(this);
    this._successReject = this._successReject.bind(this);
  }

  _successApproval(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("User approved!");
    window.location = location.pathname;
  }

  _successReject(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("User rejected.");
    window.location = location.pathname;
  }

  _handleApprove() {
    approvalFields = {
      map_approval_state: 'approved',
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.pending_user.id}/map_approval`, approvalFields, this._successApproval);
  }

  _handleReject() {
    rejectionFields = {
      map_approval_state: 'rejected',
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.pending_user.id}/map_approval`, rejectionFields, this._successReject);
  }

  render() {
    return (
      <div>
        <div>
          { this.props.pending_user.first_name } { this.props.pending_user.last_name }
        </div>
        <button className="btn btn-outline" onClick={this._handleApprove}>Approve</button>
        <button className="btn btn-outline" onClick={this._handleReject}>Reject</button>
      </div>
    );
  }
}

ApproveUser.propTypes = {
  admin_id: React.PropTypes.number.isRequired,
  pending_user: React.PropTypes.object.isRequired,
};
