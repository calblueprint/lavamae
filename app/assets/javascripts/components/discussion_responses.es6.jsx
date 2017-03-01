/**
 * @prop discussion - discussion
 * @prop current_user - current user
 * @prop responses - discussion responses
 */

class DiscussionResponses extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.current_user,
      discussion: this.props.discussion,
      responses: this.props.responses
    };
  }

  renderResponses() {
    if (this.state.responses.length > 0) {
      return (
        <h5 className="responses-title">Responses</h5>
      );
    }
  }

  renderReponseForm() {
    let form = null;
    if (this.state.current_user) {
      form = (
        <div>
          <h5 className="response-form-header">Post a Response</h5>
          {/* Render Input Form */}
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
      </div>
    );
  }
}

DiscussionResponses.propTypes = {
  discussion: React.PropTypes.object.isRequired,
  current_user: React.PropTypes.object,
  responses: React.PropTypes.array
};
