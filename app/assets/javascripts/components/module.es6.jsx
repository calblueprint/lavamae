/**
 * @prop resource_topic -- passed down module
 */
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    // console.log(this.props.resource_topic.name);

  }

  _handleClick(e) {
    e.preventDefault();
    console.log(this.props.resource_topic.id);
    console.log(this.props.resource_topic.);
  }

  render() {
    // const buttonInstance = (
    //   <ButtonToolbar>
    //   <DropdownButton bsSize="large" title="Large button" id="dropdown-size-large">
    //     <MenuItem eventKey="1">Doc 1</MenuItem>
    //     <MenuItem eventKey="2">Doc 2</MenuItem>
    //     <MenuItem eventKey="3">Doc 3</MenuItem>
    //     <MenuItem divider />
    //     <MenuItem eventKey="4">Doc 4</MenuItem>
    //   </DropdownButton>
    // </ButtonToolbar>
    // );
    return (
      <div className="module-item-container col-xs-12 col-md-5" onClick = {this._handleClick}>
        <div tabindex="1" className="module-item row">
          <div className="cover-picture">
            <a href=""><img src="/assets/pug.jpg" /></a>
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