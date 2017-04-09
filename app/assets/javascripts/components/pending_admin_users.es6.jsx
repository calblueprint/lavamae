/**
  * @prop pending_users - list of users with admin_approval_state set to "pending"/0
  * @prop user_id - user id for the current user
  */

class PendingAdminUsers extends React.Component {
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
        <ApproveAdmin
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

PendingAdminUsers.propTypes = {
  pending_users: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
};

/**
  * @prop admin_id - id of admin approving or rejecting the pending user
  * @prop pending_user - user whose admin_approval_state is set to "pending"
  */

class ApproveAdmin extends React.Component {
  constructor(props) {
    super(props);
    this._handleApprove = this._handleApprove.bind(this);
    this._handleReject = this._handleReject.bind(this);
    this._successApproval = this._successApproval.bind(this);
    this._successReject = this._successReject.bind(this);
  }

  _successApproval(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Admin approved!");
    window.location = location.pathname;
  }

  _successReject(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("User rejected.");
    window.location = location.pathname;
  }

  _handleApprove() {
    approvalFields = {
      admin_approval_state: 1,
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.pending_user.id}/admin_approval`, approvalFields, this._successApproval);
  }

  _handleReject() {
    rejectionFields = {
      admin_approval_state: 2,
      admin_id: this.props.admin_id
    }
    APIRequester.put(`/users/${this.props.pending_user.id}/admin_approval`, rejectionFields, this._successReject);
  }

  render() {
    return (
      <div className="approval">
        <p className="approval-name">
          { this.props.pending_user.first_name } { this.props.pending_user.last_name }
        </p>
        <div className="approval-btns">
          <button className="btn btn-sm btn-blue" onClick={this._handleApprove}>
            <i className="fa fa-check"></i> Approve
          </button>
          <button className="btn btn-sm btn-outline" onClick={this._handleReject}>
            <i className="fa fa-close"></i> Reject
          </button>
        </div>
      </div>
    );
  }

}

ApproveAdmin.propTypes = {
  admin_id: React.PropTypes.number.isRequired,
  pending_user: React.PropTypes.object.isRequired,
};
