/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop show_favorites - display favorites flag
 * @prop date_handler - handler to render timestamp
 * @prop tag_filter - tag filter param
 * @prop search_param - search param
 * @prop all_tags - all tags
 */

class DiscussionIndex extends React.Component {

  constructor(props) {
    super(props);
    this._addTag = this._addTag.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._generateLink = this._generateLink.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._success = this._success.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      showFavorites: this.props.show_favorites != null,
      currentUser: this.props.current_user,
      favoriteDiscussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
      search: this.props.search_param,
      tagFilter: this.props.tag_filter,
      allTags: this.props.all_tags,
      showModal: false,
      tags: []
    };
  }

  _handleChange(tags) {
    this.setState({tags})
  }


  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _success(msg) {
    this._closeModal();
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Save successful!");
    window.location = "/";
  }

  _successfulSave() {

  }

  _addTag(tag) {
    this.setState({ allTags: this.state.allTags.push(tag) },
                   () => {
                    const tagFields = {
                    tag: {
                      name: tag
                    }
                  };
                  APIRequester.put(`/admintags/new`, tagFields, this._successfulSave);
                });
  }

  _generateLink(disc, search, fav, filter) {
    let searchParam = "";
    if (this.state.search != null) {
      searchParam = "&search=" + this.state.search;
    }

    let favParam = "";
    if (!fav) {
      favParam = "&fav=true";
    }

    let filterParam = "";
    if (this.state.tagFilter) {
      for (var i = 0; i < this.state.tagFilter.length; i++) {
          if (filter != this.state.tagFilter[i]) {
            filterParam += "&filter[]=" + this.state.tagFilter[i];
          }
      }
    }

    let discussionParam = "";
    if (disc) {
      discussionParam = "discussion_id=" + disc.id;
    }

    let discussionRoute = '/discussions?' + discussionParam + searchParam + favParam + filterParam;
    return discussionRoute
  }

  renderFilters() {
    return this.props.all_tags.map((filter, i) => {
      var tagClass;
      var buttonLink;
      if (this.props.tag_filter && this.props.tag_filter.includes(filter)) {
        tagClass = "discussion-tag checked";
        buttonLink = this._generateLink(this.state.discussion, this.state.search, !this.state.showFavorites, filter);
      } else {
        tagClass = "discussion-tag";
        buttonLink = this._generateLink(this.state.discussion, this.state.search, !this.state.showFavorites, filter) + "&filter[]=" + filter;
      }
      return (
        <a href={buttonLink} key={i}>
          <button className={tagClass}>{filter}</button>
        </a>
      )});
  }

  renderDiscussionHeader() {
    let favoritesSelected = "";
    if (this.state.showFavorites) {
      favoritesSelected = "discussion-favorite selected";
    } else {
      favoritesSelected = "discussion-favorite";
    }
    let header = null;
    if (this.state.currentUser) {
      header = (
        <div>
          <a href={this._generateLink(this.state.discussion, this.state.search, this.state.showFavorites)}>
            <button className={favoritesSelected}>
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
    if (this.state.currentUser) {
      star = (
          <DiscussionFavorite
            favorite_discussions= {this.props.favorite_discussions}
            discussion = {disc}
          />
        )
    }
    return (
      <a href={this._generateLink(disc, this.state.search, !this.state.showFavorites)} key={disc.id}>
        <div tabIndex="4" className={"discussion-item row " +
          (this.state.discussion.id == disc.id ? "selected-discussion" : "")}>
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
            <button className="discussion-tag" onClick={this._openModal}>Manage Tags</button>

            <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
              <Modal.Header>
                <Modal.Title>Manage Tags</Modal.Title>
              </Modal.Header>
              <form onSubmit={this._success}>
                <Modal.Body>
                  <TagManager
                    tags = {this.state.allTags}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-outline" type="button" onClick={this._closeModal}>Cancel</button>
                  <button className="btn btn-blue modal-btn" type="submit">Save</button>
                </Modal.Footer>
              </form>
            </Modal>

          </div>
            {this.renderDiscussionHeader()}
        </div>
        <div className="discussion-item-container" id="discussions">
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
  show_favorites: React.PropTypes.string,
  date_handler: React.PropTypes.func,
  tag_filter: React.PropTypes.array,
  search_param: React.PropTypes.string,
  all_tags: React.PropTypes.array.isRequired
};
