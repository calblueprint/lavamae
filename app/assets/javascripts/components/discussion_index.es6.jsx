/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop show_favorites - display favorites flag
 * @prop date_handler - handler to render timestamp
 * @prop tag_filter - tag filter param
 */

class DiscussionIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this._showFavorites = this._showFavorites.bind(this);
    this.state = {
      show_favorites: this.props.show_favorites,
      current_user: this.props.current_user,
      favorite_discussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
      search: ""
    };
  }

  _showFavorites(e) {
    $(e.target).toggleClass('selected');
    this.setState({ show_favorites: !this.state.show_favorites });
  }

  renderFilters() {
    let filters = ["Starting up", "Funding", "Volunteering", "Partnering", "Learn More"];
    return filters.map((filter, i) => {
      var tagClass;
      if (filter == this.props.tag_filter) {
        tagClass = "discussion-tag checked";
      } else {
        tagClass = "discussion-tag";
      }
      return (
        <a href={"/discussions?filter=" + filter} key={i}>
          <button className={tagClass}>{filter}</button>
        </a>
      )});
  }

  renderDiscussionHeader() {
    let searchParam = "";
    if (this.state.search != "") {
      searchParam = "&search=" + this.state.search;
    }

    let favParam = "";
    if (this.state.show_favorites) {
      favParam = "&fav=true";
    }

    let discussionParam = "";
    if (this.state.discussion) {
      discussionParam = "discussion_id=" + this.state.discussion.id;
    }
    let discussionRoute = '/discussions?' + discussionParam + searchParam + favParam;
    let header = null;

    let favoritesSelected = "";
    if (this.state.show_favorites) {  
      favoritesSelected = "discussion-favorite selected";
    } else {
      favoritesSelected = "discussion-favorite";
    }
    
    if (this.state.current_user) {
      header = (
      <div>
        <a href={discussionRoute}> 
            <button className={favoritesSelected} onClick={this._showFavorites}>
              <i className="fa fa-star-o fa-lg"></i>
              <span> Favorites </span>
            </button>
        </a>
        <a href={'/discussions/new'}> 
          <button className="btn btn-blue pull-right">
            Create Discussion
          </button>
        </a>
      </div>
      );
    }
    return header;
  }


  renderShortened(disc, key) {
    let star = null;
    if (this.state.current_user) {
      star = (
          <DiscussionFavorite
            current_user = {this.props.current_user}
            favorite_discussions= {this.props.favorite_discussions}
            discussion = {disc}
          />
        )
    }
    return (
      <a href={'/discussions?discussion_id=' + disc.id} key={disc.id}>
        <div tabIndex="4" className="discussion-item row">
          <h4 className="discussion-item-title">
            {disc.title}
            <div className = "discussion-item-date pull-right">
              {this.props.date_handler(disc)}
            </div>
            <span>{star}</span>
          </h4>
          <p className="discussion-item-description">
            {disc.content}
          </p>
        </div>
      </a>
      );
  }

  renderIndex() {
    return this.state.discussions.map((disc, i) => {return this.renderShortened(disc, i)});
  }

  render() {
    return (
      <div>
          <div className="discussion-header">
            <i className="discussions-menu fa fa-comments fa-lg" onclick="discussionsMenu()"></i>
            <div className="discussion-tag-container" id="tags">
              <i className="fa fa-tags fa-lg"></i>
              {this.renderFilters()}
            </div>
              {this.renderDiscussionHeader()}
          </div>
          <div className="discussion-item-container col-xs-12 col-md-4" id="discussions">
            {this.renderIndex()}
          </div>
      </div>
    );
  }
}

DiscussionIndex.propTypes = {
  discussion: React.PropTypes.object,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object,
  favorite_discussions: React.PropTypes.array,
  show_favorites: React.PropTypes.bool,
  date_handler: React.PropTypes.func,
  tag_filter: React.PropTypes.string
};
