/**
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 */

class DiscussionFavorite extends React.Component {
  
  constructor(props) {
    super(props);
    this._starDiscussion = this._starDiscussion.bind(this);
    this._successfulFavorite = this._successfulFavorite.bind(this);
    this._successfulUnfavorite = this._successfulUnfavorite.bind(this);
    this.state = {
      current_user: this.props.current_user,
      favorite_discussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      has_favorited: this.props.favorite_discussions.includes(this.props.discussion.id)
    };
  }

  _successfulFavorite() {
    var favorites = this.state.favorite_discussions.push(this.state.discussion.id);
    this.setState({ has_favorited: !this.state.has_favorited,
                    favorite_discussions: favorites });
  }

  _successfulUnfavorite() {
    var index = this.state.favorite_discussions.indexOf(this.state.discussion.id);
    var favorites = this.state.favorite_discussions.splice(index, 1);
    this.setState({ has_favorited: !this.state.has_favorited,
                    favorite_discussions: favorites });
  }

  _starDiscussion(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.has_favorited) {
      APIRequester.delete(`/favorite_discussion/${this.state.discussion.id}`, {}, this._successfulUnfavorite);
    } else {
      APIRequester.post(`/favorite_discussion/${this.state.discussion.id}`, {}, this._successfulFavorite);
    }
    $(e.target).toggleClass('fa-star');
    $(e.target).toggleClass('fa-star-o');
  }

  renderStarred(disc) {
      let star = null;
      if (this.state.has_favorited) {
          star =  <i id={disc.id} className="fa fa-star pull-right"></i>;
      } else {
          star =  <i id={disc.id} className="fa fa-star-o pull-right"></i>;
      }
      return (
        <span className="change-icon favorite-discussion" 
                data-id={disc.id}
                data-fav={this.state.has_favorited}>
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
  current_user: React.PropTypes.object.isRequired,
  favorite_discussions: React.PropTypes.array,
};
