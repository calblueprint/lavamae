/**
 * @prop resource_topic - passed down module
 * @prop signed_in - true if there a user signed in
 * @prop is_admin - true if current user is an admin
 */

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    this._handlePreview = this._handlePreview.bind(this);
    this._handleError = this._handleError.bind(this);
    this._renderAdminEditModal = this._renderAdminEditModal.bind(this);
    this._renderAdminDeleteModal = this._renderAdminDeleteModal.bind(this);
    this._renderPreviewButton = this._renderPreviewButton.bind(this);
    this._renderActionItems = this._renderActionItems.bind(this);
    this.state = {
      resources: {},
    };
  }

  _handlePreview(e) {
    e.preventDefault();
    window.open(this.props.resource_topic.attachment.url);
  }

  _handleError(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  setDocuments(resources) {
    this.setState({ resources: resources }, function() {
      render();
    })
  }

  _renderAdminEditModal() {
    let editModal;
    if (this.props.is_admin) {
      editModal = (
        <ModuleEditModal
          style = {"btn-btn-blue"}
          resource_topic = {this.props.resource_topic}
        />
      );
    }
    return editModal;
  }

  _renderAdminDeleteModal() {
    let deleteModal;
    if (this.props.is_admin) {
      deleteModal = (
        <ModuleDeleteModal
          resource_topic = {this.props.resource_topic}
        />
      );
    }
    return deleteModal;
  }

  _renderPreviewButton() {
    let previewButton = (
      <div className="btn btn-sm btn-action module-download" onClick = {this._handlePreview}>
        <i className="fa fa-download fa-lg"></i>
        <span>Preview</span>
      </div>
    );
    return previewButton;
  }

  _renderActionItems() {
    let actionItems;
    if (this.props.signed_in) {
      actionItems = (
        <div>
          <hr></hr>
          <div className="module-item-actions">
            { this._renderAdminEditModal() }
            { this._renderAdminDeleteModal() }
            { this._renderPreviewButton() }
          </div>
        </div>
      );
    }
    return actionItems;
  }

  render() {
    return (
        <div className="module-item-container">
          <div className="module-item">
            <Img className="cover-picture" src="/assets/lavamae-logo-blue.svg" />
            <h5 className="module-item-title">
              {this.props.resource_topic.name}
            </h5>
            <div className="module-item-description">
              {this.props.resource_topic.description}
              <p>Last Updated: {this.props.resource_topic.updated_at.slice(0, 10)}</p>
            </div>
            { this._renderActionItems() }
          </div>
        </div>
    )
  }
}

ResourceModule.propTypes = {
  resource_topic: React.PropTypes.object.isRequired,
  signed_in: React.PropTypes.bool.isRequired,
  is_admin: React.PropTypes.bool.isRequired,
};
