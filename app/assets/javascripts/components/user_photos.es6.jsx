/**
 * @prop user - user
 * @prop images - photo gallery for user
**/
class UserPhotos extends React.Component {
constructor(props) {
    super(props);
    console.log(this.props.images)
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this.state = {
      images: [],
      photo: "",
      filePreviewUrl: ""
    }
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this.setState({ show_form: true });
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
    console.log(file.target.result)
    }
    reader.readAsDataURL(attachment);
  }

  _successfulSave() {
    this.setState({ show_form: false });
  }

  _saveForm(e) {
    e.preventDefault();
    const userFields = {
      user: {
        images_attributes: [{photo_data: this.state.photo}]
      }
    }
    APIRequester.put(`/users/${this.props.user.id}/update`, userFields, this._successfulSave);
    console.log(userFields)
  }

  renderForm () {
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="profile-preview" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }
    return (
      <div>
        <div className="input-field">
          <label className="file-label" htmlFor="file-input">Choose a Photo</label>
          <input className="inputfile" id="file-input" type="file" name="file" onChange={this._handleFileChange} />
            <div className="imgPreview">
              {$imagePreview}
            </div>
        </div>
        <button className="btn btn-blue btn-sm save" onClick={this._saveForm}>Save</button>
        <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
      </div>
    )
  }

  renderContent() {
    let $display = null;
    let userBio = this.props.images;
    if (userBio[0] != null) {
      $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Edit Gallery</button>);
    } else {
      $display = (<button className="btn btn-sm btn-action pull-left" onClick={this._enableForm}>Add Photos</button>);
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
