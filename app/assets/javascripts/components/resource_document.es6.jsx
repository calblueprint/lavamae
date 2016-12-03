/**
  * @prop resource_doc
  */

class ResourceDocument extends React.Component {
  constructor(props) {
    super(props);
    console.log("passed");
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    window.open(this.props.resource_doc.attachment.url);
  }

  render() {
    return (
      <a className = "module-item-container" onClick = {this._handleClick} >
        <h4 className="module-item-title">
          {this.props.resource_doc.title}
          <div className = "module-item-description">
          {this.props.resource_doc.description}
          </div>
        </h4>
      </a>
    )
  }

}