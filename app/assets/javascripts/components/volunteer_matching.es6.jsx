/**
  * @prop volunteers - list of all volunteers/volunteer seekers in same location
  * @prop user_id - user id for the current user
  */

class VolunteerMatching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteers: this.props.volunteers,
      user_id: this.props.user_id,
    }
  }

  _renderUsers() {
    if (!this.state.volunteers) {
      return
    }
    return this.state.volunteers.map((volunteer) => {
      if (volunteer.volunteer == true ) {
        return (
          <a href={"users/" + volunteer.user_id}>volunteer.first_name volunteer.last_name, Volunteer</a>
        )
      }
      if (volunteer.seeking_volunteer == true) {
        return (
          <a href={"users/" + volunteer.user_id}>volunteer.first_name volunteer.last_name, Looking for volunteer</a>
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

VolunteerMatching.propTypes = {
  volunteers: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
};
