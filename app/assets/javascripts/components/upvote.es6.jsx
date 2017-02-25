/**
 * @prop discussion - discussion
 * @prop response = response
 * @prop user - current user
 * @prop upvotes - total upvotes
 */

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this._handleUpvote = this._handleUpvote.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      score: this.props.upvotes.length,
      has_upvoted: false,
      response: this.props.response
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
      if (!this.state.response) {
        APIRequester.post(`/discussions/${this.props.discussion.id}/upvote`, {}, this._successfulSave);
      } else {
        APIRequester.post(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}/upvote`, {}, this._successfulSave);
      }
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

Upvote.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  upvotes: React.PropTypes.array.isRequired
};