/**
 * @prop discussions - discussion index
 * @prop unfiltered_discussions - all discussions in database
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop show_favorites - display favorites flag
 * @prop date_handler - handler to render timestamp
 * @prop tag_filter - tag filter param
 * @prop search_param - search param
 * @prop all_tags - all tags
 * @props loading_bus - loading lavamae bus url
 * @prop all_responses - all responses
 */

class DiscussionIndex extends React.Component {
  constructor(props) {
    super(props);
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
      filtered: this.props.discussions,
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
    filtered = [];
    for (var i = 0; i < discussions.length; i++) {
      filtered.push(discussions[i]);
    }
    this.setState({ filtered: filtered});
  }

  _onSearchChange(e) {
    if (e.keyCode == 8) {
      this.state.search = this.state.search.slice(0, -1);
      this._loadDiscussions();
    } else {
      var input = $(e.target).val();
      this.state.search = input;
      this._loadDiscussions();
    }
  }

  _loadDiscussions() {
    if (this.state.search == "") {
      this._copyToFiltered(this.props.unfiltered_discussions);
      return;
    }
    filteredDisc = [];
    this.props.unfiltered_discussions.map((discussion) => {
      var reg = new RegExp(this.state.search, "i");
      if (reg.test(discussion.title) || reg.test(discussion.content)) {
        filteredDisc.push(discussion);
      }
    })
    filteredResp = [];
    this.props.all_responses.map((response) => {
      var reg = new RegExp(this.state.search, "i");
      if (reg.test(response.content)) {
        filteredResp.push(this.props.unfiltered_discussions.find((x) => x.id == response.discussion_id));
      }
    })
    this._copyToFiltered(filteredDisc.concat(filteredResp));
  }

  _generateLink(disc, fav, filter) {
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
        buttonLink = this._generateLink(this.state.discussion, !this.state.showFavorites, filter);
      } else {
        tagClass = "discussion-tag";
        buttonLink = this._generateLink(this.state.discussion, !this.state.showFavorites, filter) + "&filter[]=" + filter;
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
          <a href={this._generateLink(this.state.discussion, this.state.showFavorites)}>
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
      <a href={this._generateLink(disc, !this.state.showFavorites)} key={disc.id}>
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
    } else if (this.state.filtered.length == 0) {
      return (
        <h4 className="index-text">
          There are no discussions with your search input.
        </h4>
      )
    } else {
      return this.state.filtered.map((disc, i) => {return this.renderShortened(disc, i)});
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
        <h1>Discussions</h1>
        <h2>
          Browse conversations, or ask your own question.  Our hope is that you
          can learn from each other’s experiences in starting up a service as
          well as be a support to one another within the Lava Mae Reach community.
        </h2>
        <div className="discussion-search">
          <input type="text" name="search" className="discussion-search-input"
            onKeyUp={(e) => this._onSearchChange(e)}
            defaultValue={this.state.search} placeholder="Search discussion threads..." />
        </div>
        <div className="discussion-header">
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
  unfiltered_discussions: React.PropTypes.array.isRequired,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object,
  favorite_discussions: React.PropTypes.array,
  show_favorites: React.PropTypes.string,
  date_handler: React.PropTypes.func,
  tag_filter: React.PropTypes.array,
  search_param: React.PropTypes.string,
  all_tags: React.PropTypes.array.isRequired,
  loading_bus: React.PropTypes.string.isRequired,
  all_responses: React.PropTypes.array
};
