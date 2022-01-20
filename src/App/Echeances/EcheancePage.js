import React from 'react';
import { Link } from "react-router-dom";
import { echeanceService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'
class EcheancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            remove:false,
            message:"",
            succed:false,
            echeances: []
        };
    }

    componentDidMount(e) {
        echeanceService.getAll().then(echeances => this.setState({ echeances }));
    }

    removeLine(id) {
        echeanceService.deleteEcheance(id)
        .then(()=>{            
            echeanceService.getAll().then(echeances => this.setState({ echeances }));
            this.setState({ remove: true, message:"Suppression terminée", succed:true});         
        })
        .catch(e=>{
            this.setState({ remove: true, message:e.message, succed:false});
        })
    }

    render() {
        const { echeances, remove, message, succed} = this.state;
        let { i } = this.state;
        const content = echeances.map((echeance, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{new Intl.DateTimeFormat("fr-FR", {day: "2-digit"}).format(new Date(echeance.date))} du mois</td>
                <td>{echeance.type.nom}</td>                              
                <td><Link to={'/editEcheance/'+echeance.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><a type="button" onClick={()=>{this.removeLine(echeance.id)}} style={{color: "#212529"}}><i className="fas fa-trash"></i></a></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <div className="row">
                    <h1 className='col-6'>Echéance</h1>
                    <div className='col-6'><a style={{float: 'right'}} type='button' onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left fa-lg"></i></a></div>
                </div>
                <div><Link to={'/createEcheance'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>                                
                                <th scope="col">Type</th>                                
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
export { EcheancePage }; 