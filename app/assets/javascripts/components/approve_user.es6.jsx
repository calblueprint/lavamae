/**
  * @prop pending_user - user whose map_approval_state is set to "pending"
  * @prop _handleApprove - sets user's map_approval_state to "approved"
  * @prop _handleReject - sets user's map_approval_state to "rejected"
  */

class ApproveUser extends React.Component {
  constructor(props) {
    super(props);
    this._approveUser = this._approveUser.bind(this);
    this._rejectUser = this._rejectUser.bind(this);
    this.state = {
      user: this.props.pending_user,
    }
  }

  _approveUser() {
    this.props._handleApprove(this.state.user)
  }

  _rejectUser() {
    this.props._handleReject(this.state.user)
  }

  render() {
    return (
      <div>
        {this.state.user.first_name}
        <button className="btn btn-outline" onClick={this._approveUser}>Approve</button>
        <button className="btn btn-outline" onClick={this._rejectUser}>Reject</button>
      </div>
    );
  }

}

ApproveUser.propTypes = {
  pending_user: React.PropTypes.object.isRequired,
  _handleApprove: React.PropTypes.func.isRequired,
  _handleReject: React.PropTypes.func.isRequired,
}
