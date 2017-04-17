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
      defaultImage: this.props.default_image,
      profilePictures: {},
    }
  }

  _setProfilePic(data, id) {
    returnObj = {};
    if (data.profile_pic.thumb.url) {
      returnObj[id] = data.profile_pic.thumb.url;
      // this.setState({ profilePictures[id]: data.profile_pic.thumb.url });
    } else {
      returnObj[id] = this.state.defaultImage;
      // this.setState({ profilePictures[id]: this.state.defaultImage });
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
      if (volunteer.volunteer == true && volunteer.seeking_volunteer == true) {
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
                <img src={profPic} />
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
                <img src={profPic} />
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
