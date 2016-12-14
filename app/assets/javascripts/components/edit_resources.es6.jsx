/**
  * @prop modules - all modules
  * @prop is_admin - true if user is an admin
  */

class EditResources extends React.Component {
  constructor(props) {
    super(props);
    this._renderModule = this._renderModule.bind(this);
    this.state = {

    };
  }

  _renderModule(module) {
    return (
      <ResourceModule
        key={module.id}
        resource_topic = {module}
        is_admin = {this.props.is_admin}
      />
    );
  }

  render() {
    let modules = this.props.modules.map((module) => this._renderModule(module));
    return (
      <div className="admin-edit-container">
        <div className="module-header">
          <h3>Edit Resources</h3>
        </div>
        <div className="module-items row">
          { modules }
        </div>
      </div>
    )
  }
}

EditResources.propTypes = {
  modules : React.PropTypes.array.isRequired,
  is_admin : React.PropTypes.bool.isRequired,
}
