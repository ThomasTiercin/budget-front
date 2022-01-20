import React from 'react';
import { categorieService, typeService, compteService} from '../../_services';

class CategorieCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            categorie: {name:''},
            error: {}
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.categorie,
            categorie: { ...this.state.categorie, [name]: value },
        });
        
    }

    handleSubmit(e) {
        e.preventDefault();
        const { categorie } = this.state;
        this.setState({ submitted: true });
        categorieService.createCategorie(categorie)
        .then(
            a => {
                this.props.history.push("/categories");
            },
            error => this.setState({ error })
        )
    }

    render() {
        return (
            <div className="col-md-12">
                <h1>Ajouter une catégorie </h1>
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
export { CategorieCreate }; 