/**
  * @prop pending_users
  */

class PendingMapUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.pending_users,
    }
  }

  render() {
    console.log(this.state.users);
    return (

      <div>
        "hello"
      </div>
    );
  }

}

PendingMapUsers.propTypes = {
  pending_users: React.PropTypes.array.isRequired,
}
