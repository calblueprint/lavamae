/**
  * @prop resource_doc
  * @prop is_admin
  */

class ResourceDocument extends React.Component {
  constructor(props) {
    super(props);
    this._handleDownload = this._handleDownload.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._admin_edit = this._admin_edit.bind(this);
  }

  _handleDownload() {
    window.open(this.props.resource_doc.attachment.url);
  }

  _handleEdit() {

  }

  _handleDelete() {

  }

  _admin_edit() {
    if (this.props.is_admin) {
      return (
        <div className="resource-item">
          <div className="resource-body">
            <h4 className="resource-title">
              {this.props.resource_doc.title}
            </h4>
            <div className="resource-description">
              {this.props.resource_doc.description}
            </div>
          </div>
          <div className="resource-download" onClick = {this._handleEdit}>
            <i className="fa fa-pencil fa-lg"></i>
          </div>
          <div className="resource-delete" onClick = {this._handleDelete}>
            <i className="fa fa-trash-o fa-lg"></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="resource-item">
          <div className="resource-body">
            <h4 className="resource-title">
              {this.props.resource_doc.title}
            </h4>
            <div className="resource-description">
              {this.props.resource_doc.description}
            </div>
          </div>
          <div className="resource-download" onClick = {this._handleDownload}>
            <i className="fa fa-download fa-lg"></i>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this._admin_edit() }
      </div>
    )
  }

}
