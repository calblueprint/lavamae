/**
 * @prop discussion - discussion
 * @prop response - response
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

    if (this.props.user && this.props.upvotes.length != 0) {
      this.state.has_upvoted = this.props.upvotes.some((element) => {
        return element.user_id == this.props.user.id
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.response) {
      if (nextProps.upvotes) {
        this.setState({ score: nextProps.upvotes.length })
      }
    }
  }

  _handleUpvote() {
    if(!this.state.has_upvoted) {
      this.state.score += 1;
      this.state.has_upvoted = true;
    } else {
      this.state.score -= 1;
      this.state.has_upvoted = false;
    }
    if (!this.state.response) {
      APIRequester.post(`/discussions/${this.props.discussion.id}/upvote`, {}, this._successfulSave);
    } else {
      APIRequester.post(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}/upvote`, {}, this._successfulSave);
    }
  }

  _successfulSave() {
    this.setState({ show_form: false});
  }

  render() {
    let $upvoteArrow = null;
    let $plural = "Upvotes";
    if (this.state.has_upvoted) {
      $upvoteArrow = (<i className="upvote-button fa fa-thumbs-up fa-lg" onClick = {this._handleUpvote}></i>);
    } else if (!this.state.has_upvoted && this.props.user) {
      $upvoteArrow = (<i className="upvote-button fa fa-thumbs-o-up fa-lg" onClick = {this._handleUpvote}></i>);
    }
    if (this.state.score == 1) {
      $plural = "Upvote"
    }
    return (
      <div className="action-container pull-left">
        {$upvoteArrow}
        <span className="upvote-count"> {this.state.score} {$plural} </span>
      </div>
    )
  }
}

Upvote.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  response: React.PropTypes.object,
  user: React.PropTypes.object,
  upvotes: React.PropTypes.array.isRequired
};
