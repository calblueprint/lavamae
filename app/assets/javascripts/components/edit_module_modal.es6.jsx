/**
 * @prop resource_topic - current resource topic to edit
 */

class EditModuleModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._success = this._success.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this.state = {
      showModal: false,
      name: this.props.resource_topic.name,
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _success(msg) {
    this._closeModal();
    window.location = location.pathname;
  }

  _handleChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _handleUpdate() {
    var resourceTopicFields = {
      name: this.state.name,
    };
    APIRequester.put(`/resource_topics/${this.props.resource_topic.id}`, resourceTopicFields, this._success);
  }

  render () {
    return (
      <div>
        <div className="fa fa-pencil fa-lg" onClick={this._openModal}></div>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Edit Module</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Module Name</label>
                <input id="title-input" type="text" name="name" onChange={this._handleChange}
                       placeholder="Name" defaultValue={this.props.resource_topic.name} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <input type="button" className="btn btn-blue modal-btn" onClick={this._handleUpdate}>Save Changes</input>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

EditModuleModal.propTypes = {
  resource_topic : React.PropTypes.object.isRequired,
};
