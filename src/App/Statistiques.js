import React from 'react';
import { mouvementService, organismeService, compteService, categorieService, echeanceService } from '../_services';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

class Statistiques extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouvement: {nom:'',montant:'',categorieId:'',echeanceId:'',organismeId:'',compteId:''},
            mouvements: [],
            echeances: [],
            comptes: [],
            organismes: [],
            categories: [],
            userId: ''
            
        };      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        this.state.userId = id;  
        mouvementService.getMouvementByUserId(id).then(mouvements => this.setState({ mouvements }));         
        echeanceService.getAll().then(echeances => this.setState({ echeances }));
        organismeService.getAll().then(organismes => this.setState({ organismes }));
        compteService.getCompteByUserId(id).then(comptes => this.setState({ comptes }));        
        categorieService.getAll().then(categories => this.setState({ categories }));     
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
                this.props.history.push("/mouvement");
                this.props.history.go("/mouvement");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { mouvements, echeances, organismes, comptes, categories } = this.state; 
        let revenusCategorie = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
              },
            ],
        }
        let revenusOrganismes = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
              },
            ],
        }
        let depensesCategorie = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
              },
            ],
        }
        let depensesOrganismes = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
              },
            ],
        }
        let i = 0;        
        let j = 0;        
        // boucle sur les catagories
        for (let categorie of categories) {
            let color = '#' + (Math.random().toString(16) + "000000").substring(2,8)           
            // depenses
            depensesCategorie.labels.push(categorie.nom) 
            depensesCategorie.datasets[0].data[i] = 0            
            depensesCategorie.datasets[0].backgroundColor.push(color)
            depensesCategorie.datasets[0].borderColor.push(color)
            // revenus
            revenusCategorie.labels.push(categorie.nom) 
            revenusCategorie.datasets[0].data[i] = 0
            revenusCategorie.datasets[0].backgroundColor.push(color)
            revenusCategorie.datasets[0].borderColor.push(color)
            i++
        }   
        for (let organisme of organismes) {
            let color = '#' + (Math.random().toString(16) + "000000").substring(2,8)           
            // depenses
            depensesOrganismes.labels.push(organisme.nom) 
            depensesOrganismes.datasets[0].data[j] = 0            
            depensesOrganismes.datasets[0].backgroundColor.push(color)
            depensesOrganismes.datasets[0].borderColor.push(color)
            // revenus
            revenusOrganismes.labels.push(organisme.nom) 
            revenusOrganismes.datasets[0].data[j] = 0
            revenusOrganismes.datasets[0].backgroundColor.push(color)
            revenusOrganismes.datasets[0].borderColor.push(color)
            j++
        }   
        // boucle sur les mouvements 
        for (let mouvement of mouvements) { 
            // catégorie
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Mensuel') depensesCategorie.datasets[0].data[depensesCategorie.labels.indexOf(mouvement.categorie.nom)] += mouvement.montant
            if (mouvement.montant > 0 && mouvement.echeance.type.nom == 'Mensuel') revenusCategorie.datasets[0].data[revenusCategorie.labels.indexOf(mouvement.categorie.nom)] += mouvement.montant
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Annuel') depensesCategorie.datasets[0].data[depensesCategorie.labels.indexOf(mouvement.categorie.nom)] += mouvement.montant/12
            if (mouvement.montant > 0 && mouvement.echeance.type.nom == 'Annuel') revenusCategorie.datasets[0].data[revenusCategorie.labels.indexOf(mouvement.categorie.nom)] += mouvement.montant/12
            // organismes
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Mensuel') depensesOrganismes.datasets[0].data[depensesOrganismes.labels.indexOf(mouvement.organisme.nom)] += mouvement.montant
            if (mouvement.montant > 0 && mouvement.echeance.type.nom == 'Mensuel') revenusOrganismes.datasets[0].data[revenusOrganismes.labels.indexOf(mouvement.organisme.nom)] += mouvement.montant
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Annuel') depensesOrganismes.datasets[0].data[depensesOrganismes.labels.indexOf(mouvement.organisme.nom)] += mouvement.montant/12
            if (mouvement.montant > 0 && mouvement.echeance.type.nom == 'Annuel') revenusOrganismes.datasets[0].data[revenusOrganismes.labels.indexOf(mouvement.organisme.nom)] += mouvement.montant/12
        } 
        var option = {
            maintainAspectRatio: false,            
          };

        let categorie = (
            <div className="row">  
                <div className="col-md-6" style={{paddingBottom: "1rem"}}>
                    <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                        <div className="card-header">
                            <h5>Charges mensuelles</h5>                                  
                        </div>
                        <div className="card-body">
                            <Pie options={option} style={{height:"15rem", width:"auto"}} data={depensesCategorie} />                                        
                        </div>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                        <div className="card-header">
                            <h5>Revenus mensuels</h5>                                  
                        </div>
                        <div className="card-body">
                            <Pie options={option} style={{height:"15rem", width:"auto"}} data={revenusCategorie} />                                        
                        </div>
                    </div>
                </div>   
            </div>
        )
        let organisme = (
            <div className="row">  
                <div className="col-md-6" style={{paddingBottom: "1rem"}}>
                    <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                        <div className="card-header">
                            <h5>Charges mensuelles</h5>                                  
                        </div>
                        <div className="card-body">
                            <Pie options={option} style={{height:"15rem", width:"auto"}} data={depensesOrganismes} />                                        
                        </div>
                    </div>
                </div>   
                <div className="col-md-6">
                    <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                        <div className="card-header">
                            <h5>Revenus mensuels</h5>                                  
                        </div>
                        <div className="card-body">
                            <Pie options={option} style={{height:"15rem", width:"auto"}} data={revenusOrganismes} />                                        
                        </div>
                    </div>
                </div>   
            </div>
        )
        return (
            <div className="album py-5">
                <div className="container">
                    <div className="row">
                        <h1 className='col-6'>Statistiques</h1>
                        <div className='col-6 second-color-font'><a style={{float: 'right'}} type='button' onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left fa-md"></i></a></div>
                    </div> 
                    <ul className="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="ex2-tab-1" data-mdb-toggle="tab" href="#ex2-tabs-1" role="tab" aria-controls="ex2-tabs-1" aria-selected="true">Par catégorie</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="ex2-tab-2" data-mdb-toggle="tab" href="#ex2-tabs-2" role="tab" aria-controls="ex2-tabs-2" aria-selected="false">Par organisme</a>
                        </li>                        
                    </ul>
                        
                    <div className="tab-content" id="ex2-content">
                        <div className="tab-pane fade show active" id="ex2-tabs-1" role="tabpanel" aria-labelledby="ex2-tab-1" >{categorie}</div>
                        <div className="tab-pane fade show" id="ex2-tabs-2" role="tabpanel" aria-labelledby="ex2-tab-2" >{organisme}</div>                        
                    </div>                    
                </div>               
            </div>
        );
    }
}

export { Statistiques };