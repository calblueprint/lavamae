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
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._success = this._success.bind(this);
    this.state = {
      show_form: false,
      content: this.props.response.content,
      showModal: false,
      data: this.props.response

    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }


  _handleDelete(e) {
    this.setState({data: null})
  }

  _success(msg) {
    this._closeModal();
    this.setState({data: null})
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Delete successful!");
    APIRequester.delete(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, this._closeModal);
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
      <div class="response-container row">
        <textarea name="content" defaultValue={this.state.content} id="response-content" ></textarea>
        <br></br>
        <button className="btn btn-sm btn-blue save" onClick={this._saveForm}>Save</button>
        <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <p class="discussion-description row wordwrap"> {this.state.content} </p><br></br>
        <div className="action-container pull-left">
          <button className="btn btn-sm btn-action" onClick={this._enableForm}>Edit</button>
          <button className='btn btn-sm btn-action btn-destroy' onClick={this._openModal}>Delete</button>
          <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
            <Modal.Header>
              <Modal.Title>Delete Response</Modal.Title>
            </Modal.Header>
            <form onSubmit={this._success}>
              <Modal.Body>
                <div className="input-field">
                  Are you sure you want to delete this response?
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
                <button className="btn btn-blue modal-btn" type="submit">Delete</button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
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
