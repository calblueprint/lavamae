/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 */

class DiscussionIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this._selectTag = this._selectTag.bind(this);
    this._starDiscussion = this._starDiscussion.bind(this);
    this._showFavorites = this._showFavorites.bind(this);
    this.state = {
      show_favorites: false,
      current_user: this.props.current_user,
      favorite_discussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
      favorites_class: "",
      search: ""
    };
  }

  /* TODO: apply filtering */
  _selectTag(e) {
    $(e.target).toggleClass('checked');
  }

  /* TODO: starring not working */
  _starDiscussion(e) {
    e.stopPropagation();
    console.log($(e.target).attr('class'));
    //if ((e.target).hasClass()
    //APIRequester.post(`/favorite_discussion/${e.target.id}`, this._closeModal);
    //APIRequester.delete(`/favorite_discussions/${e.target.id}`, this._closeModal);
    $(e.target).toggleClass('fa-star');
    $(e.target).toggleClass('fa-star-o');
  }

  /* TODO: display favorites */
  _showFavorites(e) {
    $(e.target).toggleClass('selected');
    this.setState({ show_favorites: !show_favorites });
  }

  // /* TODO Discussion created at timestamp - moments */
  // renderDiscussionTimeStamp(disc) {
  //   return;
  // }

  renderDiscussionHeader(disc) {
    let searchParam = "";
    if (this.state.search != "") {
      searchParam = "&search=" + this.state.search;
    }

    let favParam = "";
    if (this.state.show_favorites != false) {
      favParam = "&fav=true";
    }
    let discussionRoute = '/discussions?discussion_id='+ disc.id + searchParam + favParam;
    let header = null;
    if (this.state.current_user) {
      header = (
      <div>
        <a href={discussionRoute}> 
            <button className="discussion-favorite ${this.state.favorites_class}" onClick={this._showFavorites}>
              <i className="fa fa-star-o fa-lg"></i>
              Favorites
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

  renderStarred(disc) {
    if (this.state.current_user) {
      let star = null;
      if (this.state.favorite_discussions.includes(disc)) {
          star =  <i className="fa fa-star pull-right">
          </i>;
      } else {
          star =  <i className="fa fa-star-o pull-right"></i>;
      }
      return (
        <span className="change-icon favorite-discussion" 
                data-id={disc.id}
                data-fav={this.state.favorite_discussions.includes(disc)}>
                {star}
                <i id={disc.id} className="fa fa-star pull-right" onClick={this._starDiscussion}></i>
        </span>
      );
    } else {
      return;
    }
  }

   /* TODO Discussion created at timestamp - moments */
  renderShortened(disc, key) {
    return (
      <a href={'/discussions?discussion_id=' + disc.id} key={key}>
        <div tabIndex="4" className="discussion-item row">
          <h4 className="discussion-item-title">
          {disc.title}
          {this.renderStarred(disc)}
            <div className = "discussion-item-date pull-right">
            </div>
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
              <button className="discussion-tag" onClick={this._selectTag}>Starting up</button>
              <button className="discussion-tag" onClick={this._selectTag}>Funding</button>
              <button className="discussion-tag" onClick={this._selectTag}>Volunteering</button>
              <button className="discussion-tag" onClick={this._selectTag}>Partnering</button>
              <button className="discussion-tag" onClick={this._selectTag}>Learn More</button>
            </div>
              {this.renderDiscussionHeader(this.state.discussion)}
          </div>
          <div className="discussion-item-container col-xs-12 col-md-4" id="discussions">
            {this.renderIndex()}
          </div>
      </div>
    );
  }
}

DiscussionIndex.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object.isRequired,
  favorite_discussions: React.PropTypes.array.isRequired
};
