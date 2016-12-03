var Modal = ReactBootstrap.Modal;

/**
 * @prop discussion - discussion??
 */

class NewModuleModal extends React.Component {

  constructor(props) {
    super(props);

    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._success = this._success.bind(this);
    this.state = {
      showModal: false,
      data: this.props.discussion
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



  render () {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-destroy pull-right' onClick={this._openModal}>Delete</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Delete Discussion?</Modal.Title>
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
      </div>
    );
  }
}
