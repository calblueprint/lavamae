/**
 * @prop editing - true if editing, false if creating new module
 */

class EditModuleModal extends React.Component {
  constructor(props) {
    super(props);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this.state = {
      editing: true
    };
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _handleSave() {

  }

  _handleUpdate() {

  }

  render () {
    return (
      <div></div>
    );
  }
}

EditModuleModal.propTypes = {
};
