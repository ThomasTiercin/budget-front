import React from 'react';
import { mouvementService, organismeService, compteService, echeanceService, categorieService} from '../../_services';

class MouvementEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            mouvement: {nom:'', montant:'',categorieId:'', echeanceId:'',organismeId:'',compteId:''},
            echeances: [],
            categories: [],
            comptes: [],
            organismes: [],
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        mouvementService.getMouvementByUserId(id).then(mouvement => this.setState({ mouvement })) 
        echeanceService.getAll().then(echeances => this.setState({ echeances }));
        categorieService.getAll().then(categories => this.setState({ categories }));
        organismeService.getAll().then(organismes => this.setState({ organismes }));
        compteService.getCompteByUserId(id).then(comptes => this.setState({ comptes }));        
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
        const { id, mouvement } = this.state;
        this.setState({ submitted: true });
        mouvementService.updateMouvement(id, mouvement)
        .then(
            a => {
                this.props.history.push("/mouvements");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { id, echeances, categories, organismes, comptes, mouvement } = this.state;
        
        return (
            <div className="col-md-12">
                <h1>Mouvement</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" className="form-control" name="nom" value={mouvement.nom} onChange={this.handleChange} required="required"/>
                    <label htmlFor="montant">Montant :</label>
                    <input type="number" className="form-control" name="montant" step="any" value={mouvement.montant} onChange={this.handleChange} required="required"/>
                    <div className='form-group'>
                        <label htmlFor="categorieId">Categorie :</label>
                        <select className="form-select" name="categorieId" onChange={this.handleChange}>
                            <option selected>Selectionner une catégorie</option>
                            {categories.map((categorie, index) =>
                                <option key={categorie.id} selected={mouvement.categorieId == categorie.id} value={categorie.id}>{categorie.nom}</option>
                            )}
                        </select>
                        <label htmlFor="typeId">Echeance :</label>
                        <select className="form-select" name="echeanceId" onChange={this.handleChange}>
                            <option selected>Selectionner une echéance</option>
                            {echeances.map((echeance, index) =>
                                <option key={echeance.id} selected={mouvement.echeanceId == echeance.id} value={echeance.id}>
                                    {echeance.type.nom != "Mensuel" && echeance.type.nom}
                                    {echeance.type.nom == "Mensuel" && new Intl.DateTimeFormat("fr-FR", {day: "2-digit"}).format(new Date(echeance.date)) + " du mois - " + echeance.type.nom}
                                </option>
                            )}
                        </select>
                        <label htmlFor="organismeId">Organisme :</label>
                        <select className="form-select" name="organismeId"  onChange={this.handleChange}>
                            <option selected>Selectionner un organisme</option>
                            {organismes.map((organisme, index) =>
                                <option key={organisme.id} selected={mouvement.organismeId == organisme.id} value={organisme.id}>{organisme.nom}</option>
                            )}
                        </select>
                        <label htmlFor="compteId">Compte :</label>
                        <select className="form-select" name="compteId" onChange={this.handleChange}>
                            <option selected>Selectionner un compte</option>
                            {comptes.map((compte, index) =>
                                <option key={compte.id} selected={mouvement.compteId == compte.id} value={compte.id}>{compte.nom}</option>
                            )}
                        </select>
                        
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
                
            </div>
        );
    }
}
export { MouvementEdit }; 