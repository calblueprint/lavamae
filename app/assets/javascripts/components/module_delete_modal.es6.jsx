/**
 * @prop resource_topic - passed down module
 */

class ModuleDeleteModal extends React.Component {

  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this.state = {
      showModal: false,
      data: this.props.resource_topic
    };

  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _handleDelete(msg) {
    this.setState({data: null})
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Delete successful!");
    APIRequester.delete(`/resource_topics/${this.props.resource_topic.id}`, this._closeModal);
    this._closeModal();
    window.location = location.pathname;

  }


  render () {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-destroy pull-right' onClick={this._openModal}>Delete</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Delete Module?</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._success}>
            <Modal.Body>
              <div className="input-field">
                Are you sure you want to delete this module?
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit" onClick = {this._handleDelete}>Delete</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

ModuleDeleteModal.propTypes = {
  resource_topic: React.PropTypes.object.isRequired,
};
