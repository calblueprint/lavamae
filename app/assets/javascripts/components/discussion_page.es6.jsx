/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop tags - tag list
 * @prop show_favorites - display favorites flag
 * @prop discussion_username - full name of discussion creator
 * @prop discussion_date - discussion created at timestamp
 * @prop responses - discussion responses
 */

class DiscussionPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.current_user,
      favorite_discussions: this.props.favorite_discussions,
      discussion: this.props.discussion,
      discussions: this.props.discussions,
      tags: this.props.tags,
      show_favorites: this.props.show_favorites,
      discussion_username: this.props.discussion_username,
      discussion_date: this.props.discussion_date
    };
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
            />
          </div>
           <div className="user-action row">
            <div className="user-container pull-right">
              <div className="name-date">
                <a href=""><div className="user-name">{this.state.discussion_username}</div></a>
                <div className="date">{this.state.discussion_date} ago</div>
              </div>
              <div className="user-picture">
                {/* TODO render profile pic, also move user action row to DiscussionForm component */}
              </div>
            </div>
          </div> 
          <DiscussionResponses
            discussion = {this.props.discussion}
            current_user = {this.props.current_user}
            responses = {this.props.responses}
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
          current_user = {this.props.current_user}
          favorite_discussions = {this.props.favorite_discussions}
          show_favorites = {this.props.show_favorites}
        />
        {this.renderDiscussion()}
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  discussion: React.PropTypes.object,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object,
  favorite_discussions: React.PropTypes.array,
  tags: React.PropTypes.array,
  show_favorites: React.PropTypes.bool,
  discussion_username: React.PropTypes.string,
  discussion_date: React.PropTypes.string,
  responses: React.PropTypes.array
};
