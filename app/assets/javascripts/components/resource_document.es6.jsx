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
      <a className = "resource-item" onClick = {this._handleClick}>
        <h4 className="resource-title">
          {this.props.resource_doc.title}
        </h4>
        <div className = "resource-description">
          {this.props.resource_doc.description}
        </div>
      </a>
    )
  }

}
