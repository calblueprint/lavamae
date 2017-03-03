/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop currentUser - current user
 * @prop favoriteDiscussions - favorite user discussions
 * @prop tags - tag list
 * @prop showFavorites - display favorites flag
 * @prop discussionUserName - full name of discussion creator
 * @prop discussionUserImage - discussion user profile image
 * @prop responses - discussion responses
 * @prop upvotes - discussion upvotes
 * @prop tagFilter - tag filter param
 */

class DiscussionPage extends React.Component {
  
  constructor(props) {
    super(props);
    this._generateTimeStamp = this._generateTimeStamp.bind(this);
    this.state = {
      currentUser: this.props.currentUser,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
    };
  }

  _indexUpdate(obj) {
    return;
  }

  _generateTimeStamp(obj) {
    if (moment(obj.created_at) > moment().startOf('day')) {
      return moment(obj.created_at).fromNow();
    } else {
      return moment(obj.created_at).format("MMM Do, YYYY");
    }
  }

  renderDiscussion() {
    if (this.state.discussion) {
      return (
        <div className="discussion-selected-container">
          <div className="row">
            <DiscussionForm
              discussion = {this.props.discussion}
              currentUser = {this.props.currentUser}
              tags = {this.props.tags}
              upvotes = {this.props.upvotes}
              discussionUserName = {this.props.discussionUserName}
              discussionUserImage = {this.props.discussionUserImage}
              dateHandler = {this._generateTimeStamp}
            />
          </div>
          <DiscussionResponses
            discussion = {this.props.discussion}
            currentUser = {this.props.currentUser}
            responses = {this.props.responses}
            dateHandler = {this._generateTimeStamp}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="discussion-container">
        <DiscussionIndex
          discussions = {this.props.discussions}
          discussion = {this.props.discussion}
          currentUser = {this.props.currentUser}
          favoriteDiscussions = {this.props.favoriteDiscussions}
          showFavorites = {this.props.showFavorites}
          dateHandler = {this._generateTimeStamp}
          tagFilter = {this.props.tagFilter}
        />
        {this.renderDiscussion()}
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  discussion: React.PropTypes.object,
  discussions: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object,
  favoriteDiscussions: React.PropTypes.array,
  tags: React.PropTypes.array,
  showFavorites: React.PropTypes.bool,
  discussionUserName: React.PropTypes.string,
  discussionUserImage: React.PropTypes.string,
  responses: React.PropTypes.array,
  upvotes: React.PropTypes.array,
  tagFilter: React.PropTypes.string
};
