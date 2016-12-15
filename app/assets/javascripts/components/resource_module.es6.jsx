/**
 * @prop resource_topic -- passed down module
 * @prop is_admin -- passed down module
 */
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleEditTopic = this._handleEditTopic.bind(this);
    this._handleDeleteTopic = this._handleDeleteTopic.bind(this);
    this.setDocuments = this.setDocuments.bind(this)
    this.state = {
      resources: {},
      show_documents: false,
    };
  }

  _handleClick(e) {
    e.preventDefault();
    if (this.state.show_documents == false) {
      var route = `/resource_topics/${this.props.resource_topic.id}`
      APIRequester.getJSON(route, this.setDocuments, this._handleError);
      this.setState({show_documents: true});

    } else {
      this.setState({resources: {}});
      this.setState({show_documents: false});
      this._renderDocuments();

    }
  }

  _handleError(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  _handleEditTopic() {
    console.log("Edit Resource Topic");
  }

  _handleDeleteTopic() {
    console.log("Delete Resource Topic");
    APIRequester.delete(`/resource_topics/${this.props.resource_topic.id}/admin_destroy`, () => {});
  }

  setDocuments(resources) {
    this.setState({ resources: resources }, function() {
      render();
    })
  }

  _renderDocuments() {
    if (this.state.resources.resource_topics == undefined) {
      return
    }

    return this.state.resources.resource_topics.map((resource_doc) => {
      return (
        <ResourceDocument
          key={resource_doc.id}
          resource_doc = {resource_doc}
          is_admin = {this.props.is_admin}
        />
      )
    });
  }

   _admin_edit() {
    if (this.props.is_admin) {
      return (
        <div className="module-hover-icons">
          <div className="module-icons-corner">
            <div className="module-download" onClick = {this._handleEditTopic}>
              <i className="fa fa-pencil fa-lg"></i>
            </div>
            <div className="module-delete" onClick = {this._handleDeleteTopic}>
              <i className="fa fa-trash-o fa-lg"></i>
            </div>
          </div>
        </div>
      );
    }
  }


  render() {
    return (
        <div className="module-item-container">
          <div tabIndex="1" className="module-item module-flex" onClick = {this._handleClick}>
            <div className="cover-picture">
              <a href=""><img src="/assets/greybus.svg" /></a>
            </div>
            <div className="module-body">
              <h5 className="module-item-title">
                {this.props.resource_topic.name}
              </h5>
              <div className="module-item-description">
                Manuals and blueprints for building your own buses.
                <br></br>
                <p>Last Updated: {Date(this.props.resource_topic.updated_at).slice(4, 15)}</p>
              </div>
            </div>
            { this._admin_edit() }
          </div>
          <div className="resources-container">
            {this._renderDocuments()}
          </div>
        </div>
    )
  }
}
