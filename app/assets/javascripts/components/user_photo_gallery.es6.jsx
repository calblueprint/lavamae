/**
 * @prop images - photo gallery for user
*/
class UserPhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this._renderImages = this._renderImages.bind(this);
    this._renderCaption = this._renderCaption.bind(this);
    this._renderImage = this._renderImage.bind(this);
  }

  componentDidMount() {
    $(document).ready(function() {
      $('#lightgallery').lightGallery();
      $('#captions').lightGallery();
    })
  }

  _renderImages() {
    var sorted_images = this.props.images.sort((image1, image2) => image1.id - image2.id)
    return sorted_images.map((image, i) => this._renderImage(image, i));
  }

  _renderCaption(title, description) {
    return `<div><h4>${title}</h4> <p>${description}</p></div>`

  }

  _renderImage(image, i) {
    return (
      <a href={image.photo.url} key={i} data-sub-html={this._renderCaption(image.title, image.description)}>
          <div className="photo-overlay"></div>
          <img src={image.photo.thumb.url} id={image.id} className="photo" />
      </a>
    );
  }

  render() {
    return (
      <div id="lightgallery" className="user-photo-gallery">
       { this._renderImages() }
      </div>
    )
  }
}

UserPhotoGallery.propTypes = {
  images: React.PropTypes.array,
};
