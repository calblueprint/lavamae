/**
 * @prop user - user
 * @prop images - photo gallery for user
 * @props loading_bus - loading lavamae bus url
**/
class UserPhotoEdit extends React.Component {
constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._enableEdit = this._enableEdit.bind(this);
    this._disableEdit = this._disableEdit.bind(this);
    this._selectImage = this._selectImage.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._renderImages = this._renderImages.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      images: this.props.images,
      showModal: false,
      showEditForm: false,
      title: "",
      description: "",
      renderPhoto: "",
      id: ""
    }
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _cancelEdit() {
    this.setState({ showEditForm: false });
    this.setState({ showModal: false });
  }

  _enableEdit() {
    var selectedImages = document.getElementsByClassName('user-photo selected');
    if (selectedImages[0] != null) {
      this.setState({ showEditForm: true });
      for (var i = 0; i < this.props.images.length; i++) {
        if (this.props.images[i].id == selectedImages[0].id) {
          this.setState({ title: this.props.images[i].title,
                          description: this.props.images[i].description,
                          renderPhoto: this.props.images[i].photo.url,
                          id: this.props.images[i].id })
        }
      }
    } else {
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error("Please select an image.");
    }
  }

  _disableEdit() {
    this.setState({ showEditForm: false })
  }

  _selectImage(e) {
    var selectedImages = document.getElementsByClassName('user-photo selected');
    if (selectedImages[0] != null) {
      $(selectedImages[0]).toggleClass('selected');
    }
    $(e.target).toggleClass('selected');
  }

  _handleFileChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let attachment = e.target.files[0];
    reader.onload = (file) => {
      this.setState({
        renderPhoto: reader.result,
      });
    }
    reader.readAsDataURL(attachment);
  }

  _handleTextChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _renderImages() {
    const allPhotos = this.props.images.sort((image1, image2) => image1.id - image2.id);
    let renderPhotos = allPhotos.map((image, i) => {
      var photoClass;
      if (this.state.images.includes(image)) {
        photoClass = "user-photo";
      } else {
        photoClass = "user-photo selected";
      }
      return (
        <img key={i} onClick={this._selectImage} className="user-photo" src={image.photo.thumb.url} id={image.id}/>
      );
    });
    return renderPhotos;
    }

  _saveForm(e) {
    e.preventDefault();
    if (this.state.renderPhoto) {
      $("#save").hide();
      $("#close").hide();
      $('#back').hide();
      $("#loading").show();
      const imageFields = {
        user: {
          photo: this.state.renderPhoto,
          title: this.state.title,
          description: this.state.description,
          id: this.state.id,
        },
        user_id: this.props.user.id
      }
      APIRequester.put(`/images/${this.state.id}`, imageFields, this._successfulSave);
    } else {
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error("Please select an image.");
    }
  }

  _successfulSave() {
    window.location = location.pathname;
    this.setState({ show_form: false });
    this.setState({ showModal: false });
  }

  renderPhotoSelection() {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-action pull-left' onClick={this._openModal}>Edit Photo</button>
        <Modal className="modal" show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Select a Photo to Edit</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="input-field">
                Select the image you would like to edit.
              </div>
              { this._renderImages() }
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline modal-btn" type="button" onClick={this._cancelEdit}>Close</button>
              <button className="btn btn-blue modal-btn" type="button" onClick={this._enableEdit}>Select</button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }

  renderEdit() {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-action pull-left' onClick={this._openModal}>Edit Photo</button>
        <Modal className="modal" show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Edit Photo</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" type="text" name="title" defaultValue={this.state.title} onChange={this._handleTextChange} />
              </div>
              <div className="input-field">
                <label htmlFor="description-input">Caption</label>
                <input id="description-input" type="text" name="description" defaultValue={this.state.description} onChange={this._handleTextChange} />
              </div>
              <div className="input-field">
                <div className="imgPreview">
                  <img className="profile-preview" src={this.state.renderPhoto} />
                </div>
                <label className="file-label" htmlFor="file-input">Choose a Photo</label>
                <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button id="close" className="btn btn-outline modal-btn" type="button" onClick={this._cancelEdit}>Close</button>
              <button id="back" className="btn btn-outline modal-btn" type="button" onClick={this._disableEdit}>Back</button>
              <button id="save" className="btn btn-blue modal-btn" type="button" onClick={this._saveForm}>Save</button>
              <div id="loading" className="loading" style={{display: "none"}}>
                <img src={this.props.loading_bus} />
              </div>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }

  render() {
    if (!this.state.showEditForm) {
      return (
        this.renderPhotoSelection()
      )
    } else {
      return (
        this.renderEdit()
      )
    }
  }
}

UserPhotoEdit.propTypes = {
  user: React.PropTypes.object,
  images: React.PropTypes.array,
  loading_bus: React.PropTypes.string.isRequired,
};
