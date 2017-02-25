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
      immediate_upvote: false
    };
  }

  _handleUpvote() {
    if(!this.state.immediate_upvote ) {
      this.state.score += 1;
      this.state.immediate_upvote = true;
      APIRequester.post(`/discussions/${this.props.discussion.id}/upvote`, {}, this._successfulSave);
    }


    // var counts = this.props.upvotes
    // counts.push(this.props.user.id)
    // console.log(this.props.upvotes)


    // this.setState({ score: counts.length }, () => {
    //                   const discussionFields = {
    //                     discussion: {
    //                       score: counts.length,
    //                     }
    //                   };
    //                   APIRequester.put(`/discussions/${this.props.discussion.id}/upvote`, discussionFields, this._successfulSave);
    //                 });


    // APIRequester.put(`/discussions/${this.props.discussion.id}`, discussionFields, this._successfulSave);
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

DiscussionForm.propTypes = {
  discussion: React.PropTypes.object.isRequired
};