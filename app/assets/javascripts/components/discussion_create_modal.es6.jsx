/**
 * @prop all_tags - list of all tags
 * @props loading_bus - loading lavamae bus url
**/
class DiscussionCreateModal extends React.Component {
constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._selectTag = this._selectTag.bind(this);
    this._renderTags = this._renderTags.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this.state = {
      showModal: false,
      title: "",
      content: "",
      tags: []
    }
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _handleTextChange(e) {
    this.state[$(e.target).attr("name")]= $(e.target).val();
  }

  _selectTag(e) {
    $(e.target).toggleClass('checked');
  }

  _renderTags() {
    const allTags = this.props.all_tags;
    let tagButtons = allTags.map((tag, i) => {
      var tagClass;
      if (this.state.tags.includes(tag)) {
        tagClass = "discussion-tag checked";
      } else {
        tagClass = "discussion-tag";
      }
      return <button key={i} type="button" className={tagClass} name={tag} onClick={this._selectTag}>{tag}</button>;
    });
    return tagButtons;
  }

  _saveForm(e) {
    e.preventDefault();
    $("#save").hide();
    $("#close").hide();
    $("#loading").show();
    var selectedTags = document.getElementsByClassName('discussion-tag checked');
    var tagList = [];
    for (var i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i].name != "") {
        var t = selectedTags[i].name;
        tagList.push(t);
      }
    }
    const discussionFields = {
      discussion: {
        title: this.state.title,
        content: this.state.content,
        tag_list: tagList,
      }
    }
    APIRequester.post(`/discussions`, discussionFields, this._successfulSave);
  }

  _successfulSave() {
    window.location = location.pathname;
    this.setState({ show_form: false });
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button className='btn btn-blue' onClick={this._openModal}>Create Discussion</button>
        <Modal className="modal" show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Create Discussion</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="input-field">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" type="text" name="title" defaultValue={this.state.title} onChange={this._handleTextChange} />
              </div>
              <div className="input-field">
                <label htmlFor="content-input">Content</label>
                <textarea id="content-input" type="text" name="content" defaultValue={this.state.content} onChange={this._handleTextChange} />
              </div>
              <div className="discussion-tag-container create-discussion-tags" id="tags">
                <i className="fa fa-tags fa-lg">
                  {this._renderTags()}
                </i>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button id="close" className="btn btn-outline modal-btn" type="button" onClick={this._closeModal}>Close</button>
              <button id="save" className="btn btn-blue modal-btn" type="button" onClick={this._saveForm}>Save</button>
              <div id="loading" className="loading" style={{display: "none"}}>
                <img src={this.props.loading_bus} />
              </div>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

DiscussionCreateModal.propTypes = {
  all_tags: React.PropTypes.array,
  loading_bus: React.PropTypes.string.isRequired,
};
