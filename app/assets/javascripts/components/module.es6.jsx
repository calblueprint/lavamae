/**
 * @prop resource_topic -- passed down module
 * @prop resources
 */
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    this._success = this._success.bind(this);
    this._handleClick = this._handleClick.bind(this);

  }

  _handleClick(e) {
    e.preventDefault();
    console.log(this.props.resource_topic.id);
    // console.log("hi");

    var route = `/resource_topics/${this.props.resource_topic.id}`
    // console.log(route)

    APIRequester.getJSON(route, this._success);
  }

  _success(resources) {
    console.log("hello");
  }

  render() {
    return (
      <div className="module-item-container col-xs-12 col-md-5" onClick = {this._handleClick}>
        <div tabIndex="1" className="module-item row">
          <div className="cover-picture">
            <a href=""><img src="/assets/bus.png" /></a>
          </div>
          <h4 className="module-item-title">
            {this.props.resource_topic.name}
            <div className = "module-item-description"> Manuals and blueprints for building your own buses.
            </div>
            <div className = "module-item-description">
            Last Updated: {Date(this.props.resource_topic.updated_at).slice(4, 15)}
            </div>
          </h4>
        </div>
      </div>
    )
  }
}