/**
  @resource_topic - passed down module
*/
class ModuleEditModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._onClick = this._onClick.bind(this)
    this._success = this._success.bind(this);
    this._error = this._error.bind(this);
    this.state = {
      showModal: false,
      name: "",
      description: "",
      file: "",
      fileName: "",
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.state.name = this.state.name || this.props.resource_topic.name;
    this.state.description = this.state.description || this.props.resource_topic.description;
    this.state.file = this.state.file || this.props.resource_topic.file;
    this.setState({ showModal: false });
  }

  _handleUpdate(e) {
    e.preventDefault();
    var uploadFields = {
      resource_topic: {
        name: this.state.name || this.props.resource_topic.name,
        description: this.state.description || this.props.resource_topic.description,
        attachment: this.state.file || this.props.resource_topic.attachment,
      }
    }
    APIRequester.put(`/resource_topics/${this.props.resource_topic.id}`, uploadFields, this._success);
    this.setState({ showModal: false });
    window.location = location.pathname;
  }


  _handleChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _handleFileChange(e) {
    e.preventDefault();
    var path = e.target.value;
    var name = path.replace(/^.*\\/, "");
    this.setState({ fileName: name });
    let reader = new FileReader();
    let attachment = e.target.files[0];
    reader.onload = (file) => {
      this.setState({
        file: file.target.result,
      });
    }
    reader.readAsDataURL(attachment);
  }

  _onClick(e) {
    e.preventDefault();
    window.open(this.props.resource_topic.attachment.url);
  }

  _success(msg) {
    this._closeModal();
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Upload successful!");
    window.location = location.pathname;
  }

  _error(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  render () {
    let filePreviewUrl = this.state.fileName;
    let $filePreview = null;
    if (filePreviewUrl) {
      $filePreview = (<div className="previewText">{this.state.fileName}</div>);
    } else {
      $filePreview = (<div className="fileText" onClick={this._onClick}> {this.props.resource_topic.attachment.url}</div>);
    }
    return (
      <div>
        <button className="btn btn-sm btn-action btn-update pull-right" onClick={this._openModal}>Update</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Update Module</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._handleUpdate}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" type="text" name="name" onChange={this._handleChange} defaultValue = {this.props.resource_topic.name}/>
              </div>
              <div className="input-field">
                <label htmlFor="description-input">Description</label>
                <input id="description-input" type="text" name="description" onChange={this._handleChange} defaultValue = {this.props.resource_topic.description}/>
              </div>
              <div className="input-field">
                <label className="file-label" htmlFor="file-input">Change Your File</label>
                <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
              </div>
              {$filePreview}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Update</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

ModuleEditModal.propTypes = {
  resource_topic: React.PropTypes.object.isRequired,
};
