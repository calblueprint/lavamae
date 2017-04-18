/**
 * @prop user - user
 * @prop images - photo gallery for user
 * @props loading_bus - loading lavamae bus url
**/
class UserPhotoUpload extends React.Component {
constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this.state = {
      images: [],
      photo: "",
      title: "",
      description: ""
    }
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this._openModal()
    this.setState({ show_form: true });
  }

  _handleTextChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _handleFileChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let attachment = e.target.files[0];
    reader.onload = (file) => {
      this.setState({
        photo: file.target.result,
        imagePreviewUrl: reader.result,
      });
    }
    reader.readAsDataURL(attachment);
  }

  _successfulSave() {
    window.location = `/users/${this.props.user.id}`;
    this.setState({ show_form: false });
    this._closeModal();
  }

  _saveForm(e) {
    e.preventDefault();
    if (this.state.photo) {
      $("#save").hide();
      $("#close").hide();
      $("#loading").show();
      const imageFields = {
        user: {
          photo: this.state.photo,
          title: this.state.title,
          description: this.state.description,
        }
        , user_id: this.props.user.id
      }
      APIRequester.post(`/images`, imageFields, this._successfulSave);
    } else {
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error("Please select an image.");
    }
  }

  renderForm () {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="image-preview upload" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }
    return (
      <div>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
              <Modal.Title>Upload a Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="input-field">
              <label htmlFor="title-input">Title</label>
              <input id="title-input" type="text" name="title" onChange={this._handleTextChange} />
            </div>
            <div className="input-field">
              <label htmlFor="description-input">Description</label>
              <input id="description-input" type="text" name="description" onChange={this._handleTextChange} />
            </div>
            <div className="input-field">
              <label className="file-label" htmlFor="file-input">Choose a Photo</label>
              <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
                <div className="imgPreview">
                  {$imagePreview}
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button id="close" className="btn btn-outline modal-btn" onClick={this._cancelEdit}>Close</button>
            <button id="save" className="btn btn-blue save modal-btn" onClick={this._saveForm}>Save</button>
            <div id="loading" className="loading" style={{display: "none"}}>
              <img src={this.props.loading_bus} />
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  renderContent() {
    let $display = null;
    let userBio = this.props.images;
    if (userBio[0] != null) {
      $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Add Photos</button>);
    } else {
      $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Start a Gallery!</button>);
    }
    return (
      <div>
        {$display}
        <p className="discussion-description wordwrap">{}</p>
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
  }
}

UserPhotoUpload.propTypes = {
  user: React.PropTypes.object,
  images: React.PropTypes.array,
  loading_bus: React.PropTypes.string.isRequired,
};
