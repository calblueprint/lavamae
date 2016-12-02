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
    console.log(this.props.modules);
    return this.props.modules.map((resource_topic) => this._renderModule(resource_topic));
  }

  render() {

    return (
      <section className="module">
        <div className="container module-container">
          <div className="module-search row">
          <div className= "module-title"> Modules </div>

            <div className = "module-row">
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
          <div className="row">
            {this._renderModules()}

          </div>
        </div>
      </section>
    )
  }

}