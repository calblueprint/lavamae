/**
  * @prop modules
  * @prop current_user
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

  _adminEdit() {
    if (this.props.current_user && this.props.current_user.is_admin) {
      return (
        <div className="edit-resources-button">
          <form className="button_to" method="get" action="/resource_topics/admin_edit">
              <input className="btn btn-blue btn-nav" type="submit" value="Edit Resources" />
          </form>
        </div>
      );
    }
  }

  render() {

    return (
      <section className="module">
        <div className="container module-container">
          <div className="module-header">
            <h3>Modules</h3>
            <div className="new-module">
              <form className = "button_to" method = "get" action = "/resource_topics/new">
                  <input className = "btn btn-blue btn-nav" type = "submit" value = "New Module" />
              </form>
            </div>
            <ResourceUploadModal
              style = { "btn btn-blue" }
              modules = { this.props.modules }
            />
            { this._adminEdit() }
          </div>
          <div className="module-items row">
            {this._renderModules()}
          </div>
        </div>
      </section>
    )
  }

}
