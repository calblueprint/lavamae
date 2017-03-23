/**
 * @prop tags - tags
 */

class TagManager extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  renderTags() {
    return this.state.tags.map((tag, i) => {
      return ( 
            <button key={i} className="discussion-tag">
              <span>{tag}</span>
              <i className="fa fa-times fa-lg"></i>
            </button>
      )});
  }

  render() {
    return (
      <div>
        <input type="text" name="name"/>
        <br />
        {this.renderTags()}
      </div>
    );
  }
}

TagManager.propTypes = {
  tags: React.PropTypes.array.isRequired
};
