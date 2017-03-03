/**
 * @prop discussion - discussion
 * @prop currentUser - current user
 * @prop favoriteDiscussions - favorite user discussions
 */

class DiscussionFavorite extends React.Component {
  
  constructor(props) {
    super(props);
    this._starDiscussion = this._starDiscussion.bind(this);
    this._successfulFavorite = this._successfulFavorite.bind(this);
    this._successfulUnfavorite = this._successfulUnfavorite.bind(this);
    this.state = {
      currentUser: this.props.currentUser,
      favoriteDiscussions: this.props.favoriteDiscussions,
      discussion: this.props.discussion,
      hasFavorited: this.props.favoriteDiscussions.includes(this.props.discussion.id)
    };
  }

  _successfulFavorite() {
    var favorites = this.state.favoriteDiscussions;
    favorites.push(this.state.discussion.id);
    this.setState({ hasFavorited: !this.state.hasFavorited,
                    favoriteDiscussions: favorites });
  }

  _successfulUnfavorite() {
    var index = this.state.favoriteDiscussions.indexOf(this.state.discussion.id);
    favorites = this.state.favoriteDiscussions;
    favorites.splice(index, 1);
    this.setState({ hasFavorited: !this.state.hasFavorited,
                    favoriteDiscussions: favorites });
  }

  _starDiscussion(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.hasFavorited) {
      APIRequester.delete(`/favorite_discussion/${this.state.discussion.id}`, {}, this._successfulUnfavorite);
    } else {
      APIRequester.post(`/favorite_discussion/${this.state.discussion.id}`, {}, this._successfulFavorite);
    }
    $(e.target).toggleClass('fa-star');
    $(e.target).toggleClass('fa-star-o');
  }

  renderStarred(disc) {
    let star = null;
    if (this.state.hasFavorited) {
      star =  <i id={disc.id} className="fa fa-star pull-right"></i>;
    } else {
      star =  <i id={disc.id} className="fa fa-star-o pull-right"></i>;
    }
    return (
      <span className="change-icon favorite-discussion" 
        data-id={disc.id}
        data-fav={this.state.hasFavorited}>
        {star}
        <i id={disc.id} className="fa fa-star pull-right" onClick={this._starDiscussion}></i>
      </span>
    );
  }

  render() {
    return (
      <div>
        {this.renderStarred(this.state.discussion)}
      </div>
    );
  }
}

DiscussionFavorite.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  favoriteDiscussions: React.PropTypes.array,
};
