import React from 'react';
import { Link } from "react-router-dom";
import { compteService } from '../../_services';

class CompteEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            compte: {id:'',nom:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        compteService.getCompteById(this.props.match.params.id).then(compte => this.setState({ compte }))        
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
        const { id, compte } = this.state;
        this.setState({ submitted: true });
        compteService.updateCompte(id, compte)
        .then(
            a => {
                this.props.history.push("/comptes");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { compte } = this.state;
        return (
            <div className="col-md-12">
                <h1>Compte</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="nom">Nom :</label>
                        <input type="text" className="form-control" name="nom" defaultValue={compte.nom} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>                
            </div>
        );
    }
}
export { CompteEdit }; 