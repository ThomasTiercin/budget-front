import React from 'react';
import { mouvementService, organismeService, compteService, categorieService, echeanceService} from '../../_services';

class MouvementCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            mouvement: {nom:'',montant:'',categorieId:'',echeanceId:'',organismeId:'',compteId:'',userId:''},
            echeances: [],
            comptes: [],
            organismes: [],
            categories: [],
            error: {}
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(e) {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        echeanceService.getAll().then(echeances => this.setState({ echeances }));
        organismeService.getAll().then(organismes => this.setState({ organismes }));
        compteService.getCompteByUserId(id).then(comptes => this.setState({ comptes }));        
        categorieService.getAll().then(categories => this.setState({ categories }));   
        this.state.mouvement.userId = id;    
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.mouvement,
            mouvement: { ...this.state.mouvement, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { mouvement } = this.state;
        this.setState({ submitted: true });
        mouvementService.createMouvement(mouvement)
        .then(
            a => {
                this.props.history.push("/mouvements");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { echeances, organismes, comptes, categories } = this.state;
        return (
            <div className="col-md-12">
                <h1>Ajouter un mouvement </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Nom :</label>
                        <input type="text" className="form-control" name="nom" onChange={this.handleChange} required="required"/>
                        <label htmlFor="name">Montant :</label>
                        <input type="number" className="form-control" name="montant" step="any" onChange={this.handleChange} required="required"/>
                        <label htmlFor="categorieId">Categorie :</label>
                        <select className="form-select" name="categorieId" onChange={this.handleChange}>
                            <option selected>Selectionner une catégorie</option>
                            {categories.map((categeorie, index) =>
                                <option key={categeorie.id} value={categeorie.id}>{categeorie.nom}</option>
                            )}
                        </select>
                        <label htmlFor="echeanceId">Echeance :</label>
                        <select className="form-select" name="echeanceId" onChange={this.handleChange}>
                            <option selected>Selectionner une echeance</option>
                            {echeances.map((echeance, index) =>
                                <option key={echeance.id} value={echeance.id}>
                                    {echeance.type.nom != "Mensuel" && echeance.type.nom}
                                    {echeance.type.nom == "Mensuel" && new Intl.DateTimeFormat("fr-FR", {day: "2-digit"}).format(new Date(echeance.date)) + " du mois - " + echeance.type.nom}
                                </option>
                            )}
                        </select>
                        <label htmlFor="organismeId">Organisme :</label>
                        <select className="form-select" name="organismeId"  onChange={this.handleChange}>
                            <option selected>Selectionner un organisme</option>
                            {organismes.map((organisme, index) =>
                                <option key={organisme.id} value={organisme.id}>{organisme.nom}</option>
                            )}
                        </select>
                        <label htmlFor="compteId">Compte :</label>
                        <select className="form-select" name="compteId" onChange={this.handleChange}>
                            <option selected>Selectionner un compte</option>
                            {comptes.map((compte, index) =>
                                <option key={compte.id} value={compte.id}>{compte.nom}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Créer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
            </div>
        );
    }
}
export { MouvementCreate }; 