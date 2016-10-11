class RegistrationModal extends React.Component {

    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._attemptRegistration = this._attemptRegistration.bind(this);
        this._success = this._success.bind(this);
        this._renderInput = this._renderInput.bind(this);
        this.state = {
            first_name: "",
            last_name: "",
            organization: "",
            location: "",
            on_map: "",
            email: "",
            password: "",
            password_confirmation: "",
        };
    }

    _handleChange(e) {
        this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
    }

    _attemptRegistration(e) {
        e.preventDefault();
        const signupFields = {
            user: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                organization: this.state.organization,
                location: this.state.location,
                on_map: this.state.on_map,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            }
        };
        APIRequester.post("/users", signupFields, this._success);
      }

    _success(msg) {
        // TODO: Add toastr message
        window.location = "/";
    }

    _renderInput(name, label, type, placeholder) {
        return (
            <div>
                <label htmlFor={name}>{label}:</label>
                <input onChange={this._handleChange} name={name}
                    type={type} placeholder={placeholder} />
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <span className="fa fa-angle-left back"></span>
                    <h1>New Account</h1>
                </div>
                <form>
                    { this._renderInput("first_name", "First Name", "text", "Baby") }
                    { this._renderInput("last_name", "Last Name", "text", "Panda") }
                    { this._renderInput("email", "Email", "text", "panda@lavabae.org") }
                    { this._renderInput("password", "Password", "password", "") }
                    { this._renderInput("password_confirmation", "Confirm Password", "password", "") }
                    { this._renderInput("organization", "Organization", "text", "lavabae++") }
                    { this._renderInput("location", "Location", "text", "City, Country") }
                    { this._renderInput("on_map", "Appear on map?", "text", "Yas") }

                    <input name="submit" type="button" value="Create Account"
                        onClick={this._attemptRegistration} />
                </form>
                <div>
                    <a>Already have an account?</a>
                </div>
            </div>
        );
    }
}
