import React from 'react';
import { userService, typeService} from '../../_services';

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            user: {username:'',password:'',role:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        userService.getUserById(this.props.match.params.id).then(user => this.setState({ user })) 
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
        const { id, user } = this.state;
        this.setState({ submitted: true });
        userService.editUser(id, user)
        .then(
            a => {
                this.props.history.push("/users");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { id, user } = this.state;
        return (
            <div className="col-md-12">
                <h1>User {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        
                        <label htmlFor="name">Username :</label>
                        <input type="text" className="form-control" name="username" defaultValue={user.userName} onChange={this.handleChange} required="required"/>
                        <label htmlFor="name">Password :</label>
                        <input type="text" className="form-control" name="password" defaultValue={user.password} onChange={this.handleChange} required="required"/>
                        <label htmlFor="typeId">Role :</label>
                        <select className="form-select" name="role" onChange={this.handleChange}>
                            <option value="user" selected={user.role == 'user'}>User</option>
                            <option value="admin" selected={user.role == 'admin'}>Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                
            </div>
        );
    }
}
export { UserEdit }; 