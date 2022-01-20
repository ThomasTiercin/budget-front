import React from 'react';
import { compteService } from '../../_services';

class CompteCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            compte: {nom:'', userId:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(e) {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        this.state.compte.userId = id  
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.compte,
            compte: { ...this.state.compte, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { compte } = this.state;
        this.setState({ submitted: true });
        compteService.createCompte(compte)
        .then(
            a => {
                this.props.history.push("/comptes");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { userId } = this.state;
        return (
            <div className="col-md-12">
                <h1>Ajouter un compte </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="nom">Nom :</label>
                        <input type="text" className="form-control" name="nom" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Créer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
            </div>
        );
    }
}
export { CompteCreate }; 