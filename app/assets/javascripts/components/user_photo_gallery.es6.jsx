/**
 * @prop images - photo gallery for user
 * @prop user - user
*/
class UserPhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this._renderImages = this._renderImages.bind(this);
    this._renderImage = this._renderImage.bind(this);
  }

  componentDidMount() {
    $(document).ready(function() {
      $('#lightgallery').lightGallery({
        thumbnail: true
      });
    })
  }

  _renderImages() {
    return this.props.images.map((image) => this._renderImage(image));
  }

  _renderImage(image) {
    return (
      <a href={image.photo.url}>
          <img src={image.photo.thumb.url}/>
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
  user: React.PropTypes.object.isRequired,
  images: React.PropTypes.array,
};
