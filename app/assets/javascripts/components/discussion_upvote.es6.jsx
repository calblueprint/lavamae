/**
 * @prop discussion - discussion
 * @prop user - current user
 * @prop upvotes - total upvotes
 */

class DiscussionUpvote extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.upvotes[0])
    this._handleUpvote = this._handleUpvote.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      score: this.props.upvotes.length,
      has_upvoted: false
    };
  }

  _handleUpvote() {
    for (var i = 0; i < this.props.upvotes.length; i++) {
      if (this.props.upvotes[i].user_id == this.props.user.id) {
        this.state.has_upvoted = true;
      }
    }

    if(!this.state.has_upvoted) {
      this.state.score += 1;
      this.state.has_upvoted = true;
      APIRequester.post(`/discussions/${this.props.discussion.id}/upvote`, {}, this._successfulSave);
    }
  }

  _successfulSave() {
    this.setState({ show_form: false});
  }
  render() {
    return (
      <div className="action-container pull-left">
        <i className="upvote-button fa fa-angle-up fa-lg" onClick = {this._handleUpvote}></i>
        <span className="upvote-count"> {this.state.score} Upvotes</span>
      </div>
    )
  }
}

DiscussionUpvote.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  upvotes: React.PropTypes.object.isRequired
};