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
    return sorted_images.map((image) => this._renderImage(image));
  }

  _renderCaption(title, description) {
    return `<div><h4>${title}</h4> <p>${description}</p></div>`

  }

  _renderImage(image) {
    return (
      <a href={image.photo.url} data-sub-html={this._renderCaption(image.title, image.description)}>
          <img src={image.photo.thumb.url} id={image.id}/>
      </a>
    );
  }

  render() {
    return (
      <div id="lightgallery">
       { this._renderImages() }
      </div>
    )
  }
}

UserPhotoGallery.propTypes = {
  images: React.PropTypes.array,
};