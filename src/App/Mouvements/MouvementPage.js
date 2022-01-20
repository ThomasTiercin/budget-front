import React from 'react';
import { Link } from "react-router-dom";
import { mouvementService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'
class MouvementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            remove:false,
            message:"",
            succed:false,
            mouvements: []
        };
    }

    componentDidMount(e) {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        mouvementService.getMouvementByUserId(id).then(mouvements => this.setState({ mouvements }));
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
        const { mouvements, remove, message, succed} = this.state;
        let { i } = this.state;
        const content = mouvements.map((mouvement, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{mouvement.nom}</td>
                <td>{mouvement.montant}</td>
                <td>{mouvement.categorie.nom}</td>  
                <td>{mouvement.organisme.nom}</td>  
                <td>{mouvement.compte.nom}</td>  
                <td>{mouvement.echeance.type.nom}</td>                              
                <td><Link to={'/editMouvement/'+mouvement.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><a type="button" onClick={()=>{this.removeLine(mouvement.id)}} style={{color: "#212529"}}><i className="fas fa-trash"></i></a></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <div className="row">
                    <h1 className='col-6'>Mouvements</h1>
                    <div className='col-6'><a style={{float: 'right'}} type='button' onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left fa-lg"></i></a></div>
                </div>
                <div><Link to={'/createMouvement'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Categorie</th>
                                <th scope="col">Organisme</th>                                
                                <th scope="col">Compte</th>                                
                                <th scope="col">Echeance</th>                                
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
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
            </div>
            
        );
    }
}
export { MouvementPage }; 