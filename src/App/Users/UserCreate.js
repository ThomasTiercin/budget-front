import React from 'react';
import { userService} from '../../_services';

class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            user: {username:"", password:"", role:"user"},
            error: {}
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.user,
            user: { ...this.state.user, [name]: value },
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();
        const { user } = this.state;
        this.setState({ submitted: true });
        userService.createUser(user)
        .then(
            a => {
                this.props.history.push("/users");
            },
            error => this.setState({ error })
        )
    }

    render() {
        return (
            <div className="col-md-12">
                <h1>Add User </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="username">Username :</label>
                        <input type="text" className="form-control" name="username" onChange={this.handleChange} required="required"/>
                        <label htmlFor="password">Password :</label>
                        <input type="text" className="form-control" name="password" onChange={this.handleChange} required="required"/>
                        <label htmlFor="typeId">Role :</label>
                        <select className="form-select" name="role" onChange={this.handleChange}>
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { UserCreate }; 