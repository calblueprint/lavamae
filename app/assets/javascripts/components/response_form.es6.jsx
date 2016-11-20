/**
 * @prop discussion - discussion
 * @prop response - response
 */

class ResponseForm extends React.Component {
  constructor(props) {
    super(props);
    this._cancelEdit = this._cancelEdit.bind(this);
    this.successfulSave = this.successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._saveForm = this._saveForm.bind(this);

    this.state = {
      show_form: false,
      content: this.props.response.content,

    };
  }
  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this.setState({ show_form: true});
  }

  successfulSave() {
    this.setState({ show_form: false});
  }

  _saveForm(e) {
    e.preventDefault();
    this.setState({ content: $("#response-content").val() }, () => {
      const responseFields = {
        response: {
          content: this.state.content,
        }
      };
      APIRequester.put(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, responseFields, this.successfulSave);
    });
  }

  renderForm() {
    return (
      <div class="answer-container row">

        <textarea name="content" defaultValue={this.state.content} id="response-content" >
             </textarea>

        <button onClick={this._saveForm}>Save</button>
        <button onClick={this._cancelEdit}>Cancel</button>

      </div>
    )
  }

  renderContent() {
    return (

      <div class="answer-container row">
      <p class="discussion-description wordwrap"> {this.state.content} </p>
      <button onClick={this._enableForm}>Edit</button>
      </div>

    )
  }

  render() {
    let renderedContent;
    if (this.state.show_form) {
      renderedContent = this.renderForm();
    } else {
      renderedContent = this.renderContent();
    }

    return renderedContent;
  }
}

ResponseForm.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  response: React.PropTypes.object.isRequired
};
