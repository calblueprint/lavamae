/**
 * @prop resource_topic -- passed down module
 */


class ResourceModule extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.resource_topic.attachment)
    this._handleClick = this._handleClick.bind(this);
    this._handleError = this._handleError.bind(this);
    // this.setDocuments = this.setDocuments.bind(this)
    this.state = {
      resources: {},
      // show_documents: false,
    };
  }

  _handleClick(e) {
    e.preventDefault();
    window.open(this.props.resource_topic.attachment.url);
  }

  _handleError(msg) {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.error(msg);
  }

  setDocuments(resources) {
    this.setState({ resources: resources }, function() {
      render();
    })
  }

  render() {
    return (
        <div className="module-item-container">
          <div tabIndex="1" className="module-item" onClick = {this._handleClick}>
            <div className="cover-picture">
              <a href=""><Img src="/assets/greybus.svg" /></a>
            </div>
            <div className="module-body">
              <h5 className="module-item-title">
                {this.props.resource_topic.name}
              </h5>
              <div className="module-item-description">
                {this.props.resource_topic.description}
                <br></br>
                <p>Last Updated: {Date(this.props.resource_topic.updated_at).slice(4, 15)}</p>
                <div className="resource-download" onClick = {this._handleClick}>
                  <i className="fa fa-download fa-lg"></i>
                </div>
              </div>

            </div>
          </div>
        </div>
    )
  }
}
// /**
//   * @prop resource_doc
//   */

// class ResourceDocument extends React.Component {
//   constructor(props) {
//     super(props);
//     this._handleClick = this._handleClick.bind(this);
//   }

//   _handleClick() {
//     window.open(this.props.resource_doc.attachment.url);
//   }

//   render() {
//     return (
//       <div className="resource-item">
//         <div className="resource-body">
//           <h4 className="resource-title">
//             {this.props.resource_doc.title}
//           </h4>
//           <div className="resource-description">
//             {this.props.resource_doc.description}
//           </div>
//         </div>
//         <div className="resource-download" onClick = {this._handleClick}>
//           <i className="fa fa-download fa-lg"></i>
//         </div>
//       </div>
//     )
//   }

// }
