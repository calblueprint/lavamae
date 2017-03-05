/**
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop responses - discussion responses
 * @prop date_handler - handler to render timestamp
 */

class DiscussionResponses extends React.Component {

  constructor(props) {
    super(props);
    this._successfulSave = this._successfulSave.bind(this);
    this._saveResponse = this._saveResponse.bind(this);
    this.state = {
      currentUser: this.props.current_user,
      discussion: this.props.discussion,
      responses: this.props.responses
    };
  }

  _successfulSave() {
    return;
  }

  _saveResponse(e) {
    const responseFields = {
      response: {
        content: $("#response_content").val()
      }};
    APIRequester.post(`/discussions/${this.props.discussion.id}/responses`, responseFields, this._successfulSave);
  }

  renderResponses() {
    let responsesIndex = this.state.responses.map((response, i) => {
      return (
        <div key={response.id}>
          <div className="response-container row">
            <ResponseForm
              discussion = {this.props.discussion}
              response = {response}
              current_user = {this.props.current_user}
            />
            <div className="user-container">
              <div className="name-date">
                <a href=""><div className="user-name">{response.user_name}</div></a>
                <div className="date">{this.props.date_handler(response.created_at)}</div>
              </div>
              <div className="user-picture">
                <img src={response.user_image} />
              </div>
            </div>
          </div>
          <br />
        </div>
      );
    });
    if (this.state.responses.length > 0) {
      return (
        <div>
          <h5 className="responses-title">Responses</h5>
          {responsesIndex}
        </div>
      );
    }
  }

  renderReponseForm() {
    let form = null;
    if (this.state.currentUser) {
      form = (
        <div>
          <h5 className="response-form-header">Post a Response</h5>
            <textarea name="response[content]" id="response_content"></textarea>
            <a href={"/discussions?discussion_id=" + this.props.discussion.id}>
              <button className="btn btn-blue pull-right" onClick={this._saveResponse}>
                Post
              </button>
            </a>
        </div>
      );
    } else {
      form = (
        <div>
          <h4 className="response-form-header">Want to add a Discussion or Response?</h4>
          <LoginModal
            style = "btn btn-transparent btn-forum-login"
          />
        </div>
      );
    }
    return form;
  }

  render() {
    return (
      <div>
        <hr className="row" />
        <div className="response-form-container row">
          {this.renderReponseForm()}
        </div>
        {this.renderResponses()}
      </div>
    );
  }
}

DiscussionResponses.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  current_user: React.PropTypes.object,
  responses: React.PropTypes.array,
  date_handler: React.PropTypes.func
};
