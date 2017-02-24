/**
  * @prop modules
  */

class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this._renderModule = this._renderModule.bind(this);

  }

  _renderModule(resource_topic) {
    return (
      <ResourceModule
        key={resource_topic.id}
        resource_topic = {resource_topic}
      />
    );
  }

  _renderModules() {
    return this.props.modules.map((resource_topic) => this._renderModule(resource_topic));
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
