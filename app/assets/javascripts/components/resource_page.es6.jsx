/**
  * @prop modules
  */

class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.modules);
    this._moduleClick = this._moduleClick.bind(this);
    this._renderModule = this._renderModule.bind(this);
    this._renderModules = this._renderModules.bind(this);
    this.state = {
      showModule: false
    };
  }

  _moduleClick() {
    this.setState({ showModule: true });
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
