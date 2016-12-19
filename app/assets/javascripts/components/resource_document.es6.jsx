/**
  * @prop resource_doc - passed down document
  * @prop modules      - all module topics
  * @prop is_admin     - true if user is an admin
  */

class ResourceDocument extends React.Component {
  constructor(props) {
    super(props);
    this._handleDownload = this._handleDownload.bind(this);
    this._handleDeleteDoc = this._handleDeleteDoc.bind(this);
    this._successDelete = this._successDelete.bind(this);
    this._admin_edit = this._admin_edit.bind(this);
  }

  _handleDownload() {
    window.open(this.props.resource_doc.attachment.url);
  }

  _successDelete(msg) {
    window.location = location.pathname;
  }

  _handleDeleteDoc() {
    console.log("Delete Document");
    APIRequester.delete(`/resources/${this.props.resource_doc.id}`, this._successDelete);
  }

  _admin_edit() {
    if (this.props.is_admin) {
      return (
        <div>
          <div className="resource-edit">
            <ResourceUploadModal style={"fa fa-pencil fa-lg"}
                                 modules={this.props.modules}
                                 module_id={this.props.resource_doc.resource_topic_id}
                                 doc_id={this.props.resource_doc.id}
                                 title={this.props.resource_doc.title}
                                 description={this.props.resource_doc.description} />
          </div>
          <div className="resource-delete" onClick={this._handleDeleteDoc}>
            <i className="fa fa-trash-o fa-lg"></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="resource-download" onClick={this._handleDownload}>
          <i className="fa fa-download fa-lg"></i>
        </div>
      );
    }
  }

  render() {
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
        { this._admin_edit() }
      </div>
    )
  }

}

ResourceModule.propTypes = {
  resource_doc : React.PropTypes.object.isRequired,
  modules      : React.PropTypes.array.isRequired,
  is_admin     : React.PropTypes.bool.isRequired,
};
