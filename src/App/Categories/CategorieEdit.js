import React from 'react';
import { categorieService } from '../../_services';

class CategorieEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            categorie: {nom:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        categorieService.getCategorieById(this.props.match.params.id).then(categorie => this.setState({ categorie })) 
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
        const { id, categorie } = this.state;
        this.setState({ submitted: true });
        categorieService.updateCategorie(id, categorie)
        .then(
            a => {
                this.props.history.push("/categories");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { categorie } = this.state;
        return (
            <div className="col-md-12">
                <h1>Categorie </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="nom">Nom :</label>
                        <input type="text" className="form-control" name="nom" defaultValue={categorie.nom} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
                
            </div>
        );
    }
}
export { CategorieEdit }; 