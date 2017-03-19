/**
 * @prop user - user
 * @prop images - photo gallery for user
**/
class UserPhotoDelete extends React.Component {
constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._selectImage = this._selectImage.bind(this);
    this._renderImages = this._renderImages.bind(this);
    // this._renderImage = this._renderImage.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      images: this.props.images,
      showModal: false
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
    this.setState({ show_form: true });
  }

  _selectImage(e) {
    $(e.target).toggleClass('selected');
  }

  _renderImages() {
    const allPhotos = this.props.images;
    let renderPhotos = allPhotos.map((image, i) => {
      var photoClass;
      if (this.state.images.includes(image)) {
        photoClass = "user-photo";
      } else {
        photoClass = "user-photo selected";
      }
      return (
        <img key={i} onClick={this._selectImage} className={photoClass} src={image.photo.thumb.url}/>
      );
    });
    return renderPhotos;
    }

  _saveForm(e) {
    e.preventDefault();
    var selectedImages = document.getElementsByClassName('user-photo selected');
    var imageList = [];
    for (var i = 0; i < selectedImages.length; i++) {
      if (selectedImages[i].name != "") {
        var t = selectedImages[i].name;
        imageList.push(t);
      }
    }
    this.setState ({ images: imageList }, () => {
      const userFields = {
        user: {
          photo_ids: this.state.images
        }
      };
      APIRequester.delete(`/images/${this.props.user.id}`, userFields, this._successfulSave);
    });
  }

  _successfulSave() {
    this.setState({ show_form: false });
  }

  render() {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-destroy pull-left' onClick={this._openModal}>Delete</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Remove Images</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._saveForm}>
            <Modal.Body>
              <div className="input-field">
                Select the images you would like to delete.
              </div>
              { this._renderImages() }
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Delete</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}
