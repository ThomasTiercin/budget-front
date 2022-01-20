import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: ""
        };
    }
    
    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username')),
            role: atob(localStorage.getItem('role'))
        });
    }
    render() {
        const { username, role } = this.state;
        let admin = ""
        if (username) {
            admin =  
            (
                <span className="nav-item dropdown">
                    <div className="nav-link main-color text-white dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">Paramètres</div>
                    <ul className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                        {role =='admin' && <li><a href="/categories" className="dropdown-item main-color text-white">Categories</a></li>}
                        {username && <li><a href="/comptes" className="dropdown-item main-color text-white">Comptes</a></li>}
                        {role =='admin' && <li><a href="/echeances" className="dropdown-item main-color text-white">Echeances</a></li>}
                        {username && <li><a href="/mouvements" className="dropdown-item main-color text-white">Mouvements</a></li>}
                        {role =='admin' && <li><a href="/organismes" className="dropdown-item main-color text-white">Organismes</a></li>}
                        {role =='admin' && <li><a href="/types" className="dropdown-item main-color text-white">Types</a></li>}
                        {role =='admin' && <li><a href="/users" className="dropdown-item main-color text-white">Utilisateurs</a></li>}
                    </ul>
                </span>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg main-color">
                <div className="container-fluid">
                    <a className="navbar-brand second-color-font" href="/">Budget'Air</a>
                    <button style={{color: 'white'}} className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {username && <li><a href="/mouvement" className="nav-link px-2 text-white">Mes mouvements</a></li>}                            
                            {username && <li><a href="/statistiques" className="nav-link px-2 text-white">Statistiques</a></li>}                            
                        </ul>
                        <div className="d-flex">
                            {admin}
                            {username && <a className="nav-link disabled px-2 text-white">{username} &nbsp;&nbsp;</a>}
                            {username && <a href="/logout" className="btn-sm btn-danger me-2" style={{marginTop: 'auto',marginBottom: 'auto'}}>Déconnexion</a>}
                            {!username &&  <a href="/login" className="btn btn-outline-light me-2">Se connecter</a>}
                            {!username && <a href="/signup" className="btn btn-outline-warning me-2">S'inscrire</a>}    
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header ; 