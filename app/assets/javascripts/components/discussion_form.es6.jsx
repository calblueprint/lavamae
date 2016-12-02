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
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._success = this._success.bind(this);
    this.state = {
      show_form: false,
      title: this.props.discussion.title,
      content: this.props.discussion.content,
      showModal: false,
      data: this.props.discussion,
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
    window.location = "/";
    APIRequester.delete(`/discussions/${this.props.discussion.id}`, this._closeModal);
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
          <div className="input-field">
            <label htmlFor="discussion_title">Title</label>
            <input type="text" name="title" defaultValue={this.state.title} id="discussion_title" />
          </div>
          <div className="input-field">
            <label htmlFor="discussion_body">Body</label>
            <br/>
            <textarea name="content" defaultValue={this.state.content} id="discussion_content" ></textarea>
          </div>
          <br></br>
          <button className="btn btn-blue btn-sm save" onClick={this._saveForm}>Save</button>
          <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
        </form>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-destroy pull-right' onClick={this._openModal}>Delete</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Delete Discussion</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._success}>
            <Modal.Body>
              <div className="input-field">
                Are you sure you want to delete this discussion?
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Delete</button>
            </Modal.Footer>
          </form>
        </Modal>
        <button className="btn btn-sm btn-action pull-right" onClick={this._enableForm}>Edit</button>
        <h2 className="discussion-title">{this.state.title}</h2>
        <p className="discussion-description wordwrap">{this.state.content}</p>
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
