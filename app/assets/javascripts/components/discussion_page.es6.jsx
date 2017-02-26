/**
 * @prop discussions - discussion index
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop favorite_discussions - favorite user discussions
 * @prop tags - tag list
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
    };
  }

  render() {
    return (
      <div className="discussion-container">
        <DiscussionIndex
          discussions = {this.props.discussions}
          discussion = {this.props.discussion}
          current_user = {this.props.current_user}
          favorite_discussions = {this.props.favorite_discussions}
        />
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
                <a href=""><div className="user-name">NAME PLACEHOLDER</div></a>
                <div className="date">TIME PLACEHOLDER</div>
              </div>
              <div className="user-picture">
                {/* TODO render profile pic, also move user action row to DiscussionForm component */}
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  discussions: React.PropTypes.array.isRequired,
  current_user: React.PropTypes.object.isRequired,
  favorite_discussions: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired
};
