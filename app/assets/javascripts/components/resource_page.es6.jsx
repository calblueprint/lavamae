class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this._renderModule = this._renderModule.bind(this);
    this._success = this._success.bind(this);
    this._fetchModules = this._fetchModules.bind(this);
    this.state = {
      modules : []
    };
  }

  componentDidMount() {
      this._fetchModules();
  }

  _renderModule(resource_topic) {
    return (
      <ResourceModule
        key={resource_topic.id}
        resource_topic = {resource_topic}
      />
    );
  }

  _success(data) {
    this.setState({ modules: data.resource_topics });
  }

  _fetchModules() {
    APIRequester.get("/api/resource_topics", this._success);
  }

  _renderModules() {
    return this.state.modules.map((resource_topic) => this._renderModule(resource_topic));
  }

  render() {
    return (
      <section>
        <div className="container modules-container">
          <div className="modules-header">
            <h3>Modules</h3>
            <ModuleUploadModal style = { "btn-btn-blue" } />
          </div>
          <div className="modules row">
            {this._renderModules()}
          </div>
        </div>
      </section>
    )
  }
}
