import React from 'react';

import { userService } from '../_services';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        userService.logout();
        this.props.history.push("/login");
        this.props.history.go("/login");
    }    
    render() {
        return (
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>Déconnexion</h1>
            </div>
        );
    }
}

export { Logout }; 