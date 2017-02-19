/**
 * @prop resource_topic -- passed down module
 */

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.resource_topic)
    this._handleClick = this._handleClick.bind(this);
    this._handleError = this._handleError.bind(this);
    this.state = {
      resources: {},
    };
  }

  _handleClick(e) {
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

  render() {
    return (
        <div className="module-item-container">
          <div tabIndex="1" className="module-item">
            <div className="cover-picture">
              <a href=""><Img src="/assets/greybus.svg" /></a>
            </div>
            <div className="module-body">
              <h5 className="module-item-title">
                {this.props.resource_topic.name}
              </h5>
              <div className="module-item-description">
                {this.props.resource_topic.description}
                <br></br>
                <p>Last Updated: {this.props.resource_topic.updated_at.slice(0, 10)}</p>
              </div>
              <div className="btn btn-sm btn-action pull-right module-download" onClick = {this._handleClick}>
                <i className="fa fa-download fa-lg"></i>
              </div>
              <ModuleEditModal
                style = {"btn-btn-blue"}
                resource_topic = {this.props.resource_topic}
              />
              <ModuleDeleteModal
                resource_topic = {this.props.resource_topic}
              />
            </div>
          </div>
        </div>
    )
  }
}