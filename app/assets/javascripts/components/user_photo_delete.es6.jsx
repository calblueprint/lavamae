/**
 * @prop user - user
 * @prop images - photo gallery for user
 * @props loading_bus - loading lavamae bus url
**/
class UserPhotoDelete extends React.Component {
constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._selectImage = this._selectImage.bind(this);
    this._renderImages = this._renderImages.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      images: this.props.images,
      showModal: false,
      photo_ids: []
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
        <img key={i} onClick={this._selectImage} className="user-photo" src={image.photo.thumb.url} id={image.id}/>
      );
    });
    return renderPhotos;
    }

  _saveForm(e) {
    e.preventDefault();
    var selectedImages = document.getElementsByClassName('user-photo selected');
    var imageList = [];
    if (selectedImages[0] != null) {
      $("#delete").hide();
      $("#close").hide();
      $('#loading').show();
      for (var i = 0; i < selectedImages.length; i++) {
          imageList.push(selectedImages[i].id);
      }
      this.setState ({ photo_ids: imageList }, () => {
        const userFields = {
          user: {
            photo_ids: this.state.photo_ids
          }
        };
        APIRequester.delete(`/images/${this.props.user.id}`, userFields, this._successfulSave);
      });
    } else {
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error("Please select an image.");
    }
  }

  _successfulSave() {
    window.location = location.pathname;
    this.setState({ show_form: false });
    this._closeModal();
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
              <button id="close" className="btn btn-outline modal-btn" type="button" onClick={this._closeModal}>Close</button>
              <button id="delete" className="btn btn-blue modal-btn" type="submit">Delete</button>
              <div id="loading" className="loading" style={{display: "none"}}>
                <img src={this.props.loading_bus} />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}
UserPhotoDelete.propTypes = {
  user: React.PropTypes.object,
  images: React.PropTypes.array,
  loading_bus: React.PropTypes.string.isRequired,
};
