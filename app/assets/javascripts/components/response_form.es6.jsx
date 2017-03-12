/**
 * @prop discussion - discussion
 * @prop response - response
 * @prop current_user - current user
 */

class ResponseForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.upvotes)
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._successfulDelete = this._successfulDelete.bind(this);
    this._fetchUpvotes = this._fetchUpvotes.bind(this);
    this._setUpvotes = this._setUpvotes.bind(this);
    this.state = {
      showForm: false,
      currentUser: this.props.current_user,
      content: this.props.response.content,
      showModal: false,
      data: this.props.response,
      upvotes: []
    };
  }

  componentDidMount() {
      this._fetchUpvotes();
  }

  _fetchUpvotes() {
    APIRequester.get(`/api/responses/${this.props.response.id}/upvotes`, this._setUpvotes);
  }

  _setUpvotes(data) {
    this.setState({ modules: data.upvotes });
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

  _successfulDelete(msg) {
    this._closeModal();
    this.setState({data: null})
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Delete successful!");
    APIRequester.delete(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, this._closeModal);
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ showForm: false });
  }

  _enableForm() {
    this.setState({ showForm: true});
  }

  _successfulSave() {
    this.setState({ showForm: false});
  }

  _saveForm(e) {
    e.preventDefault();
    this.setState({ content: $("#response-content").val() }, () => {
      const responseFields = {
        response: {
          content: this.state.content,
        }
      };
      APIRequester.put(`/discussions/${this.props.discussion.id}/responses/${this.props.response.id}`, responseFields, this._successfulSave);
    });
  }

  renderForm() {
    return (
      <div className="response-edit-form">
        <textarea name="content" defaultValue={this.state.content} id="response-content" ></textarea>
        <br></br>
        <button className="btn btn-sm btn-blue save" onClick={this._saveForm}>Save</button>
        <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
      </div>
    )
  }

  renderGuestContent() {
    return (
      <div className="response-text">
        <p> {this.state.content} </p>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="response-text">
        <p> {this.state.content} </p><br></br>
        <div className="action-container pull-left">
          <button className="btn btn-sm btn-action" onClick={this._enableForm}>Edit</button>
          <button className='btn btn-sm btn-action btn-destroy' onClick={this._openModal}>Delete</button>
          <Upvote
                discussion = {this.props.discussion}
                response = {this.props.response}
                user = {this.props.current_user}
                upvotes = {this.state.upvotes}
              />
          <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
            <Modal.Header>
              <Modal.Title>Delete Response</Modal.Title>
            </Modal.Header>
            <form onSubmit={this._successfulDelete}>
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
    if (this.state.showForm) {
      renderedContent = this.renderForm();
    } else {
      if (this.state.currentUser && this.state.currentUser.id == this.state.data.user_id) {
        renderedContent = this.renderContent();
      } else {
        renderedContent = this.renderGuestContent();
      }
    }

    return renderedContent;
  }
}

ResponseForm.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  response: React.PropTypes.object.isRequired,
  current_user: React.PropTypes.object
};
