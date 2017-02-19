/**
  * @prop pending_user
  * @prop _handleApprove
  * @prop _handleReject
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
    console.log(this.state.user);
  }

  _rejectUser() {
    this.props._handleReject(this.state.user)
    console.log(this.state.user);
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
  pending_user: React.PropTypes.Object.isRequired,
  _handleApprove: React.PropTypes.func.isRequired,
  _handleReject: React.PropTypes.func.isRequired,
}
