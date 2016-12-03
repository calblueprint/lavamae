/**
 * @prop resource_topic -- passed down module
 */
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleError = this._handleError.bind(this);
    this.setDocuments = this.setDocuments.bind(this)
    this.state = {
      resources: {},
      show_documents: false,
    };
  }

  _handleClick(e) {
    e.preventDefault();
    if (this.state.show_documents == false) {
      console.log("click");
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

  setDocuments(resources) {
    this.setState({ resources: resources })
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
        />
      )
    });
  }


  render() {
    return (
      <div className="module-item-container" onClick = {this._handleClick}>
        <div tabIndex="1" className="module-item">
          <div className="cover-picture">
            <a href=""><img src="/assets/greybus.svg" /></a>
          </div>
          <h4 className="module-item-title">
            {this.props.resource_topic.name}
            <div className = "module-item-description"> Manuals and blueprints for building your own buses.
            </div>
            <div className = "module-item-description">
            Last Updated: {Date(this.props.resource_topic.updated_at).slice(4, 15)}
            </div>
            {this._renderDocuments()}
          </h4>
        </div>
      </div>
    )
  }
}
