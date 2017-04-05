/**
 * @prop tags - tags
 * @prop close_modal_handler - close modal
 */

class TagManager extends React.Component {
  
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._removeTag = this._removeTag.bind(this);
    this._success = this._success.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      tags: this.props.tags
    };
  }

  _successfulSave() {
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Save successful!");
    window.location = "/";
  }

  _success(msg) {
    const tagFields = {tags: this.state.tags}
    APIRequester.put(`/admin_tags/save`, tagFields, this._successfulSave);
    this.props.close_modal_handler();
  }

  _handleKeyPress(e) {
    if (e.key == 'Enter') {
      e.preventDefault();
      var newTags = this.state.tags.slice();
      newTags.push(e.currentTarget.value);
      this.setState({tags: newTags});
      e.currentTarget.value = "";
    }
  }

  _removeTag(e) {
    e.preventDefault();
    var newTags = this.state.tags.filter(function(x) { return x != e.currentTarget.value })
    this.setState({tags: newTags});
  }

  renderTags() {
    return this.state.tags.map((tag, i) => {
      return ( 
            <button key={i} value={tag} className="discussion-tag" onClick={this._removeTag}>
              {tag} <i className="fa fa-times fa-lg"></i>
              
            </button>
      )});
  }

  render() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Manage Tags</Modal.Title>
        </Modal.Header>
        <form onSubmit={this._success}>
          <Modal.Body>
            <input type="text" placeholder="Press enter to add" onKeyPress={this._handleKeyPress}/>
            <br />
            <br />
            {this.renderTags()}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline" type="button" onClick={this.props.close_modal_handler}>Cancel</button>
            <button className="btn btn-blue modal-btn" type="submit">Save</button>
          </Modal.Footer>
        </form>
      </div>
    );
  }
}

TagManager.propTypes = {
  tags: React.PropTypes.array.isRequired,
  close_modal_handler: React.PropTypes.func.isRequired
};
