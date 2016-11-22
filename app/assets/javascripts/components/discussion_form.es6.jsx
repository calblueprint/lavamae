/**
 * @prop discussion - discussion
 */

class DiscussionForm extends React.Component {
  constructor(props) {
    super(props);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this.state = {
      show_form: false,
      title: this.props.discussion.title,
      content: this.props.discussion.content,
    };
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this.setState({ show_form: true });
  }

  _successfulSave() {
    this.setState({ show_form: false });
  }

  _saveForm(e) {
    e.preventDefault();
    this.setState({ title: $("#discussion_title").val(),
                    content: $("#discussion_content").val() }, () => {
                      const discussionFields = {
                        discussion: {
                          title: this.state.title,
                          content: this.state.content,
                        }
                      };
                      APIRequester.put(`/discussions/${this.props.discussion.id}`, discussionFields, this._successfulSave);
                    });
  }

  renderForm() {
    return (
      <div>

      <form class="new_discussion" id="new_discussion" action="/discussions" acceptCharset="UTF-8" method="post">

        <label htmlFor="discussion_title">Title</label>
        <br/>
        <input class="discussion-title" type="text" name="title" defaultValue={this.state.title} id="discussion_title" />

        <p>
          <label htmlFor="discussion_body">Body</label>
          <br/>
          <textarea name="content" defaultValue={this.state.content} id="discussion_content" >
             </textarea>
        </p>
      <button onClick={this._saveForm}>Save</button>
      <button onClick={this._cancelEdit}>Cancel</button>

      </form>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
      <h2 class="discussion-title"> {this.state.title} </h2>
      <p class="discussion-description wordwrap"> {this.state.content} </p>
      <button onClick={this._enableForm}>Edit</button>
      </div>
    )
  }

  render() {
    let renderedContent;
    if (this.state.show_form) {
      return this.renderForm();
    } else {
      return this.renderContent();
    }

    return renderedContent;
  }
}

DiscussionForm.propTypes = {
  discussion: React.PropTypes.object.isRequired
};
