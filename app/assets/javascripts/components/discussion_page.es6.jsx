/**
 * @prop discussions - discussion index
 * @prop unfiltered_discussions - all discussions w/ tags and favorites applied, but no search
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop tags - tag list
 * @prop show_favorites - display favorites flag
 * @prop discussion_username - full name of discussion creator
 * @prop discussion_userimage - discussion user profile image
 * @prop responses - discussion responses
 * @prop upvotes - discussion upvotes
 * @prop tag_filter - tag filter param
 * @prop search_param - search param
 * @prop all_tags - all tags
 * @props loading_bus - loading lavamae bus url
 * @prop default_image - default profile image url
 * @prop  all_responses - all responses
 */

class DiscussionPage extends React.Component {

  constructor(props) {
    super(props);
    this._generateTimeStamp = this._generateTimeStamp.bind(this);
    this.state = {
      discussion: this.props.discussion
    };
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
              current_user = {this.props.current_user}
              tags = {this.props.tags}
              upvotes = {this.props.upvotes}
              discussion_username = {this.props.discussion_username}
              discussion_userimage = {this.props.discussion_userimage}
              date_handler = {this._generateTimeStamp}
              all_tags = {this.props.all_tags}
            />
          </div>
          <DiscussionResponses
            discussion = {this.props.discussion}
            current_user = {this.props.current_user}
            responses = {this.props.responses}
            date_handler = {this._generateTimeStamp}
            default_image = {this.props.default_image}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="section-placeholder">
        <div className="discussion-container">
          <DiscussionIndex
            discussions={this.props.discussions}
            unfiltered_discussions = {this.props.unfiltered_discussions}
            discussion={this.props.discussion}
            current_user={this.props.current_user}
            favorite_discussions={this.props.favorite_discussions}
            show_favorites={this.props.show_favorites}
            date_handler={this._generateTimeStamp}
            tag_filter={this.props.tag_filter}
            search_param={this.props.search_param}
            all_tags={this.props.all_tags}
            loading_bus={this.props.loading_bus}
            all_responses = {this.props.all_responses}
          />
          {this.renderDiscussion()}
        </div>
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  discussion: React.PropTypes.object,
  unfiltered_discussions: React.PropTypes.array.isRequired,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object,
  favorite_discussions: React.PropTypes.array,
  tags: React.PropTypes.array,
  show_favorites: React.PropTypes.string,
  discussion_username: React.PropTypes.string,
  discussion_userimage: React.PropTypes.string,
  responses: React.PropTypes.array,
  upvotes: React.PropTypes.array,
  tag_filter: React.PropTypes.array,
  search_param: React.PropTypes.string,
  all_tags: React.PropTypes.array.isRequired,
  loading_bus: React.PropTypes.string.isRequired,
  default_image: React.PropTypes.string.isRequired,
  all_responses: React.PropTypes.array
};
