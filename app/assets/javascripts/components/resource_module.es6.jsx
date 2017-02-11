/**
 * @prop resource_topic -- passed down module
 */


class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.resource_topic)
    this._handleClick = this._handleClick.bind(this);
    this._handleError = this._handleError.bind(this);
    this.setDocuments = this.setDocuments.bind(this)
    this.state = {
      resources: {},
      // show_documents: false,
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

  setDocuments(resources) {
    this.setState({ resources: resources }, function() {
      render();
    })
  }

  render() {
    return (
        <div className="module-item-container">
          <div tabIndex="1" className="module-item" onClick = {this._handleClick}>
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
                <p>Last Updated: {Date(this.props.resource_topic.updated_at).slice(4, 15)}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
