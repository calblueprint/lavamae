/**
 * @prop response - response
 */

class ResponseForm extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props.response.content)

    this.successfulSave = this.successfulSave.bind(this)
    this.enableForm = this.enableForm.bind(this)
    this.state = {
      show_form: false,

    }
  }

  successfulSave() {
    this.setState({ show_form: false})
  }

  enableForm() {
    this.setState({ show_form: true})
  }

  saveForm() {
    const responseFields = {
      discussion: this.state.discussion,
      id: this.state.response.id,
      content: this.state.response.content,

    };

    APIRequester.put(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, responseFields, this.successfulSave);
  }

  renderForm() {
    return (
      <div class="answer-container row">

        <textarea name="reponse[content]" defaultValue={this.props.response.content} id="reponse_content">
             </textarea>

      <button onClick={this.saveForm}>Save</button>
      </div>
    )
  }

  renderContent() {
    return (
      <div class="answer-container row">
        <div class="answer-text pull-left wordwrap">
          {this.props.response.content}
        </div>

      <button onClick={this.enableForm}>Edit</button>
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