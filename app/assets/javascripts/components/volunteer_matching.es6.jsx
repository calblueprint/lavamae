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
          <div key = {volunteer.id} className="user-container volunteer-container">
            <a href={volunteer.id}>
              <div className="user-picture">
                <img src={volunteer.user_image} />
              </div>
              <div className="name-date">
                <div className="user-name">
                  { volunteer.first_name } { volunteer.last_name }
                </div>
              </div>
              <div className="tooltip">
                <img className="badge" src="/assets/volunteer-badge.png"></img>
                <span className="tooltiptext">
                  Volunteer
                </span>
              </div>
            </a>
          </div>
        )
      } else if (volunteer.seeking_volunteer == true) {
        return (
          <div key = {volunteer.id}>
          <a href={volunteer.id}>
            <p>
              { volunteer.first_name } { volunteer.last_name }
            </p>
            <p>Looking for volunteers</p>
          </a>
        </div>
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
