/**
 * @prop style       - button style
 * @prop modules     - list of all resource topics
 * @prop module_id   - resource topic ID
 * @prop doc_id      - ID of current resource
 * @prop title       - title of current resource if editing
 * @prop description - description of current resource if editing
 */

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
    this._successUpdate = this._successUpdate.bind(this);
    this._error = this._error.bind(this);
    this._renderModalButton = this._renderModalButton.bind(this);
    this._renderModuleSelect = this._renderModuleSelect.bind(this);
    this._renderUploadButton = this._renderUploadButton.bind(this);
    this.state = {
      showModal: false,
      title: this.props.title,
      description: this.props.description,
      modules: this.props.modules,
      module: this.props.module_id,
      file: null,
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

    if (this.props.doc_id) {
      APIRequester.put(`/resources/${this.props.doc_id}`, uploadFields, this._successUpdate);
    } else {
      APIRequester.post("/resources", uploadFields, this._success);
    }
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

  _successUpdate(msg) {
    this._closeModal();
    window.location = location.pathname;
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

  _renderModalButton() {
    if (this.props.doc_id) {
      return (
        <div className={this.props.style} onClick={this._openModal}></div>
      );
    } else {
      return (
        <button className={this.props.style} onClick={this._openModal}>Upload Resource</button>
      );
    }
  }

  _renderModuleSelect() {
    const moduleOptions = this.state.modules.map((module) => {
      return (
          <option key={module['id']} value={module['id']}>{module['name']}</option>
      );
    });

    if (this.props.doc_id) {
      return (
        <select name="module" defaultValue={this.props.module_id} onChange={this._handleSelect} >
          {moduleOptions}
        </select>
      );
    } else {
      return (
        <select name="module" defaultValue="None" onChange={this._handleSelect} >
                    <option value=''>None</option>
          {moduleOptions}
        </select>
      );
    }
  }

  _renderUploadButton() {
    if (this.props.doc_id) {
      return (
        <button className="btn btn-blue modal-btn" type="submit">Save Changes</button>
      );
    } else {
      return (
        <button className="btn btn-blue modal-btn" type="submit">Upload</button>
      );
    }
  }

  render () {
    let filePreviewUrl = this.state.fileName;
    let $filePreview = null;
    if (filePreviewUrl) {
      $filePreview = (<div className="previewText">{this.state.fileName}</div>);
    } else {
      $filePreview = (<div className="previewText">Please select a file</div>);
    }
    return (
      <div>
        {this._renderModalButton()}
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Upload New Resource</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._handleUpload}>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" type="text" name="title" onChange={this._handleChange}
                       placeholder="Resource Title" defaultValue={this.state.title} />
              </div>
              <div className="input-field">
                <label htmlFor="description-input">Description</label>
                <input id="description-input" type="text" name="description" onChange={this._handleChange}
                       placeholder="Resource Description" defaultValue={this.state.description} />
              </div>
              <div className="input-field">
                <label>
                  Module
                  {this._renderModuleSelect()}
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
              {this._renderUploadButton()}
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

ResourceUploadModal.propTypes = {
  style       : React.PropTypes.string.isRequired,
  modules     : React.PropTypes.array.isRequired,
  doc_id      : React.PropTypes.number,
  module_id   : React.PropTypes.number,
  title       : React.PropTypes.string,
  description : React.PropTypes.string,
};
