/**
 * @prop discussion - discussion
 * @prop tags - tag list
 * @prop current_user - current user
 * @prop upvotes - discussion upvotes
 */

class DiscussionForm extends React.Component {
  constructor(props) {
    super(props);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._successfulSave = this._successfulSave.bind(this);
    this._enableForm = this._enableForm.bind(this);
    this._saveForm = this._saveForm.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._success = this._success.bind(this);
    this._renderTags = this._renderTags.bind(this);
    this._renderFormTags = this._renderFormTags.bind(this);
    this._selectTag = this._selectTag.bind(this);
    this.state = {
      show_form: false,
      title: this.props.discussion.title,
      content: this.props.discussion.content,
      tags: this.props.tags,
      score: this.props.discussion.score,
      showModal: false,
      current_user: this.props.current_user,
      data: this.props.discussion,
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }


  _handleDelete(e) {
    this.setState({data: null})
  }

  _success(msg) {
    this._closeModal();
    this.setState({data: null})
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.success("Delete successful!");
    window.location = "/";
    APIRequester.delete(`/discussions/${this.props.discussion.id}`, this._closeModal);
  }

  _cancelEdit(e) {
    e.preventDefault();
    this.setState({ show_form: false });
  }

  _enableForm() {
    this.setState({ show_form: true });
  }

  _successfulSave() {
    this.setState({ show_form: false });
  }

  _saveForm(e) {
    e.preventDefault();
    var selectedTags = document.getElementsByClassName('discussion-tag checked');
    var tagList = [];
    for (var i = 0; i < selectedTags.length; i++) {
      var t = selectedTags[i].name;
      tagList.push(t)
    }
    this.setState({ title: $("#discussion_title").val(),
                    content: $("#discussion_content").val(),
                    tags: tagList }, () => {
                      const discussionFields = {
                        discussion: {
                          title: this.state.title,
                          content: this.state.content,
                          tag_list: tagList
                        }
                      };
                      APIRequester.put(`/discussions/${this.props.discussion.id}`, discussionFields, this._successfulSave);
                    });
  }

  _selectTag(e) {
    $(e.target).toggleClass('checked');
  }

  _renderTags() {
    let tagButtons = this.state.tags.map((tag, i) => {return <button key={i} className="discussion-tag discussion-tag-small">{tag}</button>});
    return tagButtons;
  }

  _renderFormTags() {
    const allTags = ["Starting up", "Funding", "Volunteering", "Partnering", "Learn More"];
    let tagButtons = allTags.map((tag) => {
      var tagClass;
      if (this.state.tags.includes(tag)) {
        tagClass = "discussion-tag checked";
      } else {
        tagClass = "discussion-tag";
      }
      return <button type="button" className={tagClass} name={tag} onClick={this._selectTag}>{tag}</button>;
      });
    return tagButtons;
  }

  renderForm() {
    return (
      <div>
        <form className="new_discussion" id="new_discussion" action="/discussions" acceptCharset="UTF-8" method="post">
          <div className="input-field">
            <label htmlFor="discussion_title">Title</label>
            <input type="text" name="title" defaultValue={this.state.title} id="discussion_title" />
          </div>
          <div className="input-field">
            <label htmlFor="discussion_body">Body</label>
            <br/>
            <textarea name="content" defaultValue={this.state.content} id="discussion_content" ></textarea>
          </div>
          <div className="discussion-tag-container" id="tags">
            <i className="fa fa-tags fa-lg"></i>
            {this._renderFormTags()}
          </div>
          <br></br>
          <br></br>
          <button className="btn btn-blue btn-sm save" onClick={this._saveForm}>Save</button>
          <button className="btn btn-sm btn-outline" onClick={this._cancelEdit}>Cancel</button>
        </form>
      </div>
    )
  }

  renderGuestContent() {
    return (
        <div>
          <h2 className="discussion-title">{this.state.title} </h2>
          <p className="discussion-description wordwrap">{this.state.content}</p>
          <div className="action-container pull-left">
            <Upvote
              discussion = {this.props.discussion}
              user = {this.props.current_user}
              upvotes = {this.props.upvotes}
            />
            <br></br>
            <div className="discussion-tag-container" id="tags">
              {this._renderTags()}
            </div>
          </div> 
        </div>
      )
  }

  renderContent() {
    return (
      <div>
        <button className='btn btn-sm btn-action btn-destroy pull-right' onClick={this._openModal}>Delete</button>
        <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
          <Modal.Header>
            <Modal.Title>Delete Discussion</Modal.Title>
          </Modal.Header>
          <form onSubmit={this._success}>
            <Modal.Body>
              <div className="input-field">
                Are you sure you want to delete this discussion?
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline" type="button" onClick={this._closeModal}>Close</button>
              <button className="btn btn-blue modal-btn" type="submit">Delete</button>
            </Modal.Footer>
          </form>
        </Modal>
        <button className="btn btn-sm btn-action pull-right" onClick={this._enableForm}>Edit</button>
        <h2 className="discussion-title">{this.state.title}</h2>
        <p className="discussion-description wordwrap">{this.state.content}</p>
        <div className="action-container pull-left">
          <Upvote
            discussion = {this.props.discussion}
            user = {this.props.current_user}
            upvotes = {this.props.upvotes}
          />
          <br></br>
          <div className="discussion-tag-container" id="tags">
            {this._renderTags()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.show_form) {
      return this.renderForm();
    } else {
      if (this.state.current_user && this.state.current_user.id == this.state.data.user_id) {
        return this.renderContent();
      } else {
        return this.renderGuestContent();
      }
    }
  }
}

DiscussionForm.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  current_user: React.PropTypes.object,
  tags: React.PropTypes.array,
  upvotes: React.PropTypes.array
};
