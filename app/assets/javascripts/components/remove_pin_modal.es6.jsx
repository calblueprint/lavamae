// /**
// * @props style - button style
// * @props user_id - user's id
// */
//
// var Modal = ReactBootstrap.Modal;
//
// class RemovePinModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this._openModal = this._openModal.bind(this);
//     this._closeModal = this._closeModal.bind(this);
//     this._success = this._success.bind(this);
//     this._error = this._error.bind(this);
//     this.state = {
//       showModal: false,
//       user_id: this.props.user_id,
//       admin_map_approval: true,
//     };
//   }
//
//   _openModal() {
//     this.setState({ showModal: true });
//   }
//
//   _closeModal() {
//     this.setState({ showModal: false });
//   }
//
//   _success(msg) {
//     this._closeModal();
//     window.location = location.pathname;
//   }
//
//   _error(msg) {
//     toastr.options.positionClass = 'toast-bottom-right';
//     toastr.error(msg);
//   }
//
//   _attemptSave(response = null) {
//     APIRequester.put(`/users/${this.props.user_id}`, admin_map_approval: false, this._success);
//   }
//
//   render() {
//     return (
//       <div>
//         <button className="btn btn-sm btn-blue" onClick={this._openModal}>Delete</button>
//         <Modal className="modal" show={this.state.showModal} onHide={this._closeModal} >
//           <Modal.Header>
//             <Modal.Title>Delete User Pin</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div>
//               Are you sure you want to delete this user from the map?
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <button className="btn btn-blue modal-btn" type="submit">Delete</button>
//             <button className="btn btn-outline" type="button" onClick={this._closeModal}>Cancel</button>
//           </Modal.Footer>
//     );
//   }
// }
//
// RemovePinModal.propTypes = {
//   style: React.PropTypes.string.isRequired,
//   user_id: React.PropTypes.user_id.isRequired,
// };
