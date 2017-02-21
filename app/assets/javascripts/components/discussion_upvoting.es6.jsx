+/**
 + * @prop discussion - discussion
 + * @prop user - current user
 + */

 class DiscussionUpvote extends React.Component {
   constructor(props) {
     super(props);
     console.log(this.props.discussion)
 +    this._handleUpvote = this._handleUpvote.bind(this);
 +    this._successfulSave = this._successfulSave.bind(this);
 +    this.state = {
 +      score: this.props.discussion.score,
 +      user: this.props.user
 +    };
 +  }
 +
 +  _handleUpvote() {
 +    this.state.score += 1;
 +    console.log(this.state.score)
 +    const discussionFields = {
 +      discussion: {
 +        score: this.state.score,
 +      }
 +    };
 +    APIRequester.put(`/discussions/${this.props.discussion.id}`, discussionFields, this._successfulSave);
 +  }
 +
 +  _successfulSave() {
 +    this.setState({ show_form: false});
 +  }
 +  render() {
 +    return (
 +      <div className="action-container pull-left">
 +        <i className="upvote-button fa fa-angle-up fa-lg" onClick = {this._handleUpvote}></i>
 +        <span className="upvote-count"> {this.state.score} Upvotes</span>
 +      </div>
 +    )
 +  }
 +}
 +
 +DiscussionForm.propTypes = {
 +  discussion: React.PropTypes.object.isRequired
 +};