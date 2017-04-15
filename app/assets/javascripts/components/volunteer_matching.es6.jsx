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
    APIRequester.get(`/api/users/${this.props.pending_user.id}/profilepic`, this._setProfilePic);
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
  default_image: React.PropTypes.string.isRequired
};
