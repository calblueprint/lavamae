/**
  * @prop volunteers - list of all volunteers/volunteer seekers in same location
  * @prop user_id - user id for the current user
  * @prop default_image - default profile image url
  */

class VolunteerMatching extends React.Component {
  constructor(props) {
    super(props);
    this._setProfilePic = this._setProfilePic.bind(this);
    this._fetchProfilePic = this._fetchProfilePic.bind(this);
    this.state = {
      volunteers: this.props.volunteers,
      user_id: this.props.user_id,
      profilePic: this.props.default_image,
    }
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
    APIRequester.get(`/api/users/${this.props.user_id}/profilepic`, this._setProfilePic);
  }

  _renderUsers() {
    if (!this.state.volunteers || this.state.volunteers.length == 0) {
      return (
        <div>No current volunteers or organizations in your area.</div>
      );
    }
    return this.state.volunteers.map((volunteer) => {
      if (volunteer.volunteer == true && volunteer.seeking_volunteer == true) {
        return (
          <div key = {volunteer.id} className="user-container volunteer-container">
            <a href={volunteer.id}>
              <div className="user-picture">
                <img src={this.state.profilePic} />
              </div>
              <div className="name-date">
                <div className="user-name">
                  { volunteer.first_name } { volunteer.last_name }
                </div>
              </div>
              <div className="tooltip">
                <img className="badge calling-badge" src="/assets/calling-badge.png"></img>
                <span className="tooltiptext">
                  Seeking Volunteers
                </span>
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
      } else if (volunteer.volunteer == true ) {
        return (
          <div key = {volunteer.id} className="user-container volunteer-container">
            <a href={volunteer.id}>
              <div className="user-picture">
                <img src={this.state.profilePic} />
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
          <div key = {volunteer.id} className="user-container volunteer-container">
            <a href={volunteer.id}>
              <div className="user-picture">
                <img src={this.state.profilePic} />
              </div>
              <div className="name-date">
                <div className="user-name">
                  { volunteer.first_name } { volunteer.last_name }
                </div>
              </div>
              <div className="tooltip">
                <img className="badge" src="/assets/calling-badge.png"></img>
                <span className="tooltiptext">
                  Seeking Volunteers
                </span>
              </div>
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
  default_image: React.PropTypes.string.isRequired
};
