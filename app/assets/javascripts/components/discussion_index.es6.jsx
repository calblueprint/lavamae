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
 * @props loading_bus - loading lavamae bus url
 */

class DiscussionIndex extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.discussions[0])
    this._generateLink = this._generateLink.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._copyToFiltered = this._copyToFiltered.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._loadDiscussions = this._loadDiscussions.bind(this);
    this.state = {
      showFavorites: this.props.show_favorites != null,
      favoriteDiscussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
      search: this.props.search_param,
      tagFilter: this.props.tag_filter,
      allTags: this.props.all_tags,
      showModal: false,
      tags: [],
      filteredDisc: this.props.discussions,
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _componentDidMount() {
    this._copyToFiltered(this.props.discussions);
  }

  _copyToFiltered(discussions) {
    filteredDisc = [];
    for (var i = 0; i < discussions.length; i++) {
      filteredDisc.push(discussions[i]);
    }
    this.setState({ filteredDisc: filteredDisc});
  }

  _onSearchChange(event) {
    var input = $(event.target).val();
    this.state.search = input;
    this._loadDiscussions();
  }

  _loadDiscussions() {
    if (this.state.search == "") {
      this._copyToFiltered(this.state.discussions);
      return;
    }
    filtered = [];
    for (var i = 0; i < this.state.discussions.length; i++) {
      discussion = this.state.discussions[i];
      var reg = new RegExp(this.state.search, "i");
      if (reg.test(discussion.title) || reg.test(discussion.content)) {
        filtered.push(discussion);
      }
      for (var i = 0; i < this.state.discussions.length; i++) {
        discussion = this.state.discussions[i];
        var reg = new RegExp(this.state.search, "i");
        if (reg.test(discussion.title) || reg.test(discussion.content)) {
          filtered.push(discussion);
        }
      }
    }
    this._copyToFiltered(filtered);
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
    if (this.props.current_user) {
      header = (
        <div className="favorite-create-discussions">
          <a href={this._generateLink(this.state.discussion, this.state.search, this.state.showFavorites)}>
            <button className={favoritesSelected}>
              <i className="fa fa-star-o fa-lg"></i>
              <span> Favorites </span>
            </button>
          </a>
          <DiscussionCreateModal
            user={this.props.user}
            all_tags={this.props.all_tags}
            loading_bus={this.props.loading_bus}
          />
        </div>
      );
    } else {
      header = (
        <div className="favorite-create-discussions">
          <LoginModal
            style = {'btn btn-blue pull-left'}
            from_discussion = {true}
          />
        </div>
      )
    }
    return header;
  }

  renderShortened(disc, key) {
    let star = null;
    if (this.props.current_user) {
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
    if (this.state.discussions.length == 0) {
      return (
        <h4 className="index-text">
            No discussions have matched your query.
        </h4>
      )
    } else if (this.state.filteredDisc.length == 0) {
      return (
        <h4 className="index-text">
            There are no discussions with your search input.
        </h4>
      )
    } else {
      return this.state.filteredDisc.map((disc, i) => {return this.renderShortened(disc, i)});
    }
  }

  render() {
    var tagManager = null;
    if (this.props.current_user && this.props.current_user.is_admin) {
      tagManager =  (<button className="btn btn-action btn-sm manage-tags" onClick={this._openModal}>
                      <i className="fa fa-edit fa-lg"></i> Manage Tags
                    </button>);
    }

    return (
      <div>
        <div className="discussion-header">

            <div className="discussion-search">
              <input type="text" name="search" className="discussion-search-input"
                onChange={(e) => this._onSearchChange(e)}
                placeholder="Search discussion threads..." />
            </div>


          <i className="discussions-menu fa fa-comments fa-lg" onclick="discussionsMenu()"></i>
          <div className="discussion-tag-container" id="tags">
            <i className="fa fa-tags fa-lg"></i>
            {this.renderFilters()}
            {tagManager}
            <Modal className="modal" show={this.state.showModal} onHide={this._closeModal}>
              <TagManager
                tags = {this.state.allTags}
                close_modal_handler = {this._closeModal}
              />
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
  all_tags: React.PropTypes.array.isRequired,
  loading_bus: React.PropTypes.string.isRequired,
};
