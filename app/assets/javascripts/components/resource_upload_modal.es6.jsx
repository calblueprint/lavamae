class ResourceUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleUpload = this._handleUpload.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._success = this._success.bind(this);
    this._error = this._error.bind(this);
    this.state = {
      showModal: false,
      btnStyle: this.props.style,
      title: '',
      description: '',
      modules: this.props.modules || [],
      module: null,
      file: '',
      fileName: '',
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _handleUpload(e) {
    e.preventDefault();
    const uploadFields = {
      resource: {
        title: this.state.title,
        description: this.state.description,
        attachment: this.state.file,
        resource_topic_id: this.state.module,
      }
    }
    APIRequester.post("/resources", uploadFields, this._success);
  }

  _handleChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _handleSelect(e) {
    this.setState({ module: e.target.value });
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
    const moduleOptions = this.state.modules.map((module) => {
        return (
            <option value={module['id']}>{module['name']}</option>
        );
      });
    let filePreviewUrl = this.state.fileName;
    let $filePreview = null;
    if (filePreviewUrl) {
      $filePreview = (<div className="previewText">{this.state.fileName}</div>);
    } else {
      $filePreview = (<div className="previewText">Please select a file</div>);
    }
    return (
      <div>
        <button className="btn btn-blue btn-nav" onClick={this._openModal}>Upload Resource</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Upload New Resource</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._handleUpload}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" type="text" name="title" onChange={this._handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="description-input">Description</label>
                <input id="description-input" type="text" name="description" onChange={this._handleChange} />
              </div>
              <div className="input-field">
                <label>
                  Module
                  <select name="module" defaultValue="None" onChange={this._handleSelect} >
                    <option value=''>None</option>
                    {moduleOptions}
                  </select>
                </label>
              </div>
              <div className="input-field">
                <label className="file-label" htmlFor="file-input">Choose a File</label>
                <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
              </div>
              {$filePreview}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Upload</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

ResourceUploadModal.propTypes = {
  style: React.PropTypes.string.isRequired,
  modules: React.PropTypes.array.isRequired,
};