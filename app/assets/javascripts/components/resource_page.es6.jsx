/**
  * @prop modules
  * @prop resource_module_img_src -- image link for background image of resource modules
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
        img_src = {this.props.resource_module_img_src}
      />
    );
  }

  _renderModules() {
    return this.props.modules.map((resource_topic) => this._renderModule(resource_topic));
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
          </div>
          <div>
          </div>
          <div className="module-items row">
            {this._renderModules()}

          </div>
        </div>
      </section>
    )
  }

}
