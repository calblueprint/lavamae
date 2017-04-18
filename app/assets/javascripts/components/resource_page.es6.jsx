/**
  * @props signed_in - true if there a user signed in
  * @props is_admin - true if current user is an admin
  * @props loading_bus - loading lavamae bus url
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
        signed_in = { this.props.signed_in }
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
          <img src={this.props.loading_bus} />
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
        <ModuleUploadModal
          style={"btn-btn-blue"}
          loading_bus={this.props.loading_bus}
        />
      );
    }
    return moduleUploadModal;
  }

  render() {
    return (
      <section className="modules-section">
        <div className="container modules-container">
          <div className="modules-header">
            <h1>Start Your Service</h1>
            <h2>
              Lava Mae has created a toolkit for you to reference and guide you
              in your journey on starting a mobile hygiene service.  Please
              check back, since we’ll be adding more documents on other Lava Mae
              programs, such as how to start a Pop-up Care Village in your
              community, coming soon!
            </h2>
            { this._renderModuleUploadModal() }
        </div>
          { this._renderStyledModules() }
        </div>
      </section>
    )
  }
}

ResourcePage.propTypes = {
  signed_in: React.PropTypes.bool.isRequired,
  is_admin: React.PropTypes.bool.isRequired,
  loading_bus: React.PropTypes.string.isRequired,
};
