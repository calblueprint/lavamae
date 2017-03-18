/**
  * @props is_admin - true if current user is an admin
  */

class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this._renderModule = this._renderModule.bind(this);
    this._renderModules = this._renderModules.bind(this);
    this._success = this._success.bind(this);
    this._fetchModules = this._fetchModules.bind(this);
    this._renderModuleUploadModal = this._renderModuleUploadModal.bind(this);
    this._renderStyledModules = this._renderStyledModules.bind(this);
    this.state = {
      modules : [],
      isLoading : true,
    };
  }

  componentDidMount() {
      this._fetchModules();
  }

  _renderModule(resource_topic) {
    return (
      <ResourceModule
        key = { resource_topic.id }
        resource_topic = { resource_topic }
        is_admin = { this.props.is_admin }
      />
    );
  }

  _success(data) {
    this.setState({ modules: data.resource_topics, isLoading: false});
  }

  _fetchModules() {
    APIRequester.get("/api/resource_topics", this._success);
  }

  _renderModules() {
    return this.state.modules.map((resource_topic) => this._renderModule(resource_topic));
  }

  _renderStyledModules() {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src="/assets/lavamae-bus.gif" />
        </div>
      );
    } else {
      return (
        <div className="modules row">
          {this._renderModules()}
        </div>
      );
    }
  }

  _renderModuleUploadModal() {
    let moduleUploadModal;
    if (this.props.is_admin) {
      moduleUploadModal = (
        <ModuleUploadModal style = { "btn-btn-blue" } />
      );
    }
    return moduleUploadModal;
  }

  render() {
    return (
      <section className="modules-section">
        <div className="container modules-container">
          <div className="modules-header">
            <h3>Resources</h3>
            { this._renderModuleUploadModal() }
          </div>
          { this._renderStyledModules() }
        </div>
      </section>
    )
  }
}

ResourcePage.propTypes = {
  is_admin: React.PropTypes.bool.isRequired,
};
