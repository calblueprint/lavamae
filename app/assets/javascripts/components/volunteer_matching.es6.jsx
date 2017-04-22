/**
  * @prop volunteers - list of all volunteers/volunteer seekers in same location
  * @prop user_id - user id for the current user
  * @prop default_image - default profile image url
  * @prop calling_badge - calling badge image url
  * @prop volunteer_badge - volunteer badge image url
  */

class VolunteerMatching extends React.Component {
  constructor(props) {
    super(props);
    this._setProfilePic = this._setProfilePic.bind(this);
    this._fetchProfilePic = this._fetchProfilePic.bind(this);
    this.state = {
      volunteers: this.props.volunteers,
      user_id: this.props.user_id,
      profilePictures: {},
    }
  }

  _setProfilePic(data, id) {
    returnObj = {};
    if (data.profile_pic.thumb.url) {
      returnObj[id] = data.profile_pic.thumb.url;
    } else {
      returnObj[id] = this.props.default_image;
    }
    this.setState(returnObj);
  }

  _fetchProfilePic(id) {
    extraParams = true;
    APIRequester.get(`/api/users/${id}/profilepic`, this._setProfilePic, (reject) => {}, extraParams, id);
  }

  _renderUsers() {
    if (!this.state.volunteers || this.state.volunteers.length == 0) {
      return (
        <div>No current volunteers or organizations in your area.</div>
      );
    }
    return this.state.volunteers.map((volunteer) => {
      if (!this.state[volunteer.id]) {
        this._fetchProfilePic(volunteer.id);
      }
      profPic = this.state[volunteer.id];
      var volunteerBadge = null;
      var callingBadge = null;
      if (volunteer.volunteer) {
        volunteerBadge = (
          <div className="tooltip">
            <img className="badge" src={this.props.volunteer_badge}></img>
            <span className="tooltiptext">
              Volunteer
            </span>
          </div>
        );
      }
      if (volunteer.seeking_volunteer) {
        callingBadge = (
          <div className="tooltip">
            <img className="badge calling-badge" src={this.props.calling_badge}></img>
            <span className="tooltiptext">
              Seeking Volunteers
            </span>
          </div>
        );
      }
      return (
          <div key = {volunteer.id} className="user-container volunteer-container">
            <a href={volunteer.id}>
              <div className="user-picture">
                <img src={profPic} />
              </div>
              <div className="name-date">
                <div className="user-name">
                  { volunteer.first_name } { volunteer.last_name }
                </div>
              </div>
              {callingBadge}
              {volunteerBadge}
            </a>
          </div>
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

VolunteerMatching.propTypes = {
  volunteers: React.PropTypes.array.isRequired,
  user_id: React.PropTypes.number.isRequired,
  default_image: React.PropTypes.string.isRequired,
  calling_badge: React.PropTypes.string.isRequired,
  volunteer_badge: React.PropTypes.string.isRequired
};
