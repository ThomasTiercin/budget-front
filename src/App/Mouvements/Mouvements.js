import React from 'react';
import { mouvementService, organismeService, compteService, categorieService, echeanceService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'

class Mouvements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouvement: {nom:'',montant:'',categorieId:'',echeanceId:'',organismeId:'',compteId:''},
            mouvements: [],
            echeances: [],
            comptes: [],
            organismes: [],
            categories: [],
            remove:false,
            message:"",
            succed:false,
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

    removeLine(id) {
        mouvementService.deleteMouvement(id)
        .then(()=>{            
            mouvementService.getAll().then(mouvements => this.setState({ mouvements }));
            this.setState({ remove: true, message:"Suppression terminée", succed:true});         
        })
        .catch(e=>{
            this.setState({ remove: true, message:e.message, succed:false});
        })
    }

    render() {
        let { mouvements, remove, message, succed, echeances, organismes, comptes, categories } = this.state;  
        let debit = 0;
        let credit = 0;
        for (let mouvement of mouvements) {
            if (mouvement.montant >= 0 && mouvement.echeance.type.nom == 'Annuel') credit = credit + mouvement.montant/12
            if (mouvement.montant >= 0 && mouvement.echeance.type.nom == 'Mensuel') credit = credit + mouvement.montant
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Mensuel') debit = debit + mouvement.montant    
            if (mouvement.montant < 0 && mouvement.echeance.type.nom == 'Annuel') debit = debit + mouvement.montant/12  
                       
        }   
        return (
            <div className="album py-5">
                <div className="container">
                    <div className="row">
                        <h1 className='col-6'>Mes mouvements</h1>
                        <div className='col-6 second-color-font'><a style={{float: 'right'}} type='button' onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left fa-md"></i></a></div>
                    </div>                    
                    <div className="d-flex flex-row justify-content-between">
                        <span>Ajouter un mouvement <i type="button" className="fas fa-plus second-color-font" data-mdb-toggle="modal" data-mdb-target="#ModalAjouter"></i></span>                             
                    </div>  
                    <br/>
                    <div className="row">                        
                        <div className="col-md-6">
                            <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                <div className="card-body">
                                    <div className="d-flex flex-row justify-content-between">
                                        <strong className="col-sm-6 d-flex  align-items-center">Total crédit mensuel</strong>
                                        <span className="col-sm-6 d-flex flex-row-reverse align-items-center text-success">+{credit.toFixed(2)}€</span>                                        
                                    </div>                                       
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                <div className="card-body">
                                    <div className="d-flex flex-row justify-content-between">
                                        <strong className="col-sm-6 d-flex  align-items-center">Total débit mensuel</strong>
                                        <span className="col-sm-6 d-flex flex-row-reverse align-items-center text-danger">{debit.toFixed(2)}€</span>                                        
                                    </div>                                       
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-md-1 g-3">
                        {mouvements.map((mouvement, index) => 
                            <div className="col" key={index}>
                                <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                    <div className="card-body">
                                        <div className="d-flex flex-row justify-content-between">                                                                                     
                                            <span className="col-sm-1 d-flex  align-items-center"><img style={{height: "1.2rem"}} src={mouvement.organisme.image} /></span>
                                            <strong className="col-sm-8 d-flex justify-content-center  align-items-center" style={{fontWeight: "400", fontSize: "smaller"}}>{mouvement.nom}</strong>
                                            {mouvement.montant >= 0 &&
                                                <span className="col-sm-2  text-success" style={{fontWeight: "400", fontSize: "smaller"}}>+{mouvement.montant.toFixed(2)}€ </span>
                                            }
                                            {mouvement.montant < 0 &&
                                                <span className="col-sm-2 text-danger" style={{fontWeight: "400", fontSize: "smaller"}}>{mouvement.montant.toFixed(2)}€ </span>
                                            }                                                
                                        </div>  
                                        <div className="d-flex flex-row justify-content-around  align-items-center" style={{paddingTop: "0.5rem"}}>
                                            <i type="button" className="col-sm-1 far fa-edit text-warning"  data-mdb-toggle="modal" data-mdb-target="#ModalEditer"></i>    
                                            <i type="button" className="col-sm-1 far fa-trash-alt second-color-font" onClick={()=>{this.removeLine(mouvement.id)}}></i>  
                                        </div>                                                                                                              
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ToastContainer className="p-3" position='bottom-end' >
                <Toast onClose={() => this.setState({ remove: false })} delay={4000} show={remove} autohide animation bg={succed ? 'success' : "danger"}>
                    <ToastHeader>
                    <strong className="me-auto">Suppression {succed ? 'en succès' : "en échec"}</strong>          
                    <small>now</small>
                    </ToastHeader>
                    <ToastBody className="text-white">{message}</ToastBody>
                </Toast>
                </ToastContainer>

                <div className="modal top fade" id="ModalAjouter" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
                    <div className="modal-dialog modal-lg  modal-dialog-centered">
                        <div className="modal-content">
                            <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Ajouter un mouvement</h5>
                                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='form-group'>
                                        <label htmlFor="name">Nom :</label>
                                        <input type="text" className="form-control" name="nom" onChange={this.handleChange} required="required"/>
                                        <label htmlFor="name">Montant :</label>
                                        <input type="number" className="form-control" name="montant" step="any" onChange={this.handleChange} required="required"/>
                                        <label htmlFor="categorieId">Categorie :</label>
                                        <select className="form-select" name="categorieId" onChange={this.handleChange}>
                                            <option defaultValue>Selectionner une catégorie</option>
                                            {categories.map((categeorie, index) =>
                                                <option key={categeorie.id} value={categeorie.id}>{categeorie.nom}</option>
                                            )}
                                        </select>
                                        <label htmlFor="echeanceId">Echeance :</label>
                                        <select className="form-select" name="echeanceId" onChange={this.handleChange}>
                                            <option defaultValue>Selectionner une echeance</option>
                                            {echeances.map((echeance, index) =>
                                                <option key={echeance.id} value={echeance.id}>{echeance.type.nom}</option>
                                            )}
                                        </select>
                                        <label htmlFor="organismeId">Organisme :</label>
                                        <select className="form-select" name="organismeId"  onChange={this.handleChange}>
                                            <option defaultValue>Selectionner un organisme</option>
                                            {organismes.map((organisme, index) =>
                                                <option key={organisme.id} value={organisme.id}>{organisme.nom}</option>
                                            )}
                                        </select>
                                        <label htmlFor="compteId">Compte :</label>
                                        <select className="form-select" name="compteId" onChange={this.handleChange}>
                                            <option defaultValue>Selectionner un compte</option>
                                            {comptes.map((compte, index) =>
                                                <option key={compte.id} value={compte.id}>{compte.nom}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Créer</button>
                                    <button type="button" className="btn btn-danger" data-mdb-dismiss="modal">Fermer</button>                                                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export { Mouvements };