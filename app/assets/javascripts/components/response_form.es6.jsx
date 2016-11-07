/**
 * @prop discussion - discussion
 * @prop response - response
 */

class ResponseForm extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props.response.content)
    this._cancelEdit = this._cancelEdit.bind(this)

    this._handleChange = this._handleChange.bind(this)
    this.successfulSave = this.successfulSave.bind(this)
    this._enableForm = this._enableForm.bind(this)
    this._saveForm = this._saveForm.bind(this)

    this.state = {
      show_form: false,
      content: this.props.response.content,

    }
  }
  _cancelEdit(e) {
    e.preventDefault()
    // this.props.discussion.title: this.state.title,
    // this.props.discussion.content: this.state.content,
    this.setState({ content: this.props.response.content })
    this.setState({ show_form: false })
  }

  _enableForm() {
    this.setState({ show_form: true})
  }

  _handleChange(e) {
    this.setState({ [$(e.target).attr("name")]: e.target.value });
  }

  successfulSave() {
    this.setState({ show_form: false})
    this.setState({ content: this.state.content })
  }

  _saveForm(e) {
    e.preventDefault()
    const responseFields = {
      response: {
        content: this.state.content,
      }
    };
    console.log(this.state)
    console.log(responseFields)
    APIRequester.put(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, responseFields, this.successfulSave);
  }

  renderForm() {
    return (
      <div class="answer-container row">

        <textarea name="content" defaultValue={this.state.content} onChange = {this._handleChange} id="discussion_content">
             </textarea>

        <button onClick={this._saveForm}>Save</button>
        <button onClick={this._cancelEdit}>Cancel</button>

      </div>
    )
  }

  renderContent() {
    return (
      // <div class="answer-container row">

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