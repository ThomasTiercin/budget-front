import React from 'react';
import { Link } from "react-router-dom";
import { compteService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'

class ComptePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            remove:false,
            message:"",
            succed:false,
            comptes: []
        };
    }

    componentDidMount(e) {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        compteService.getCompteByUserId(id).then(comptes => this.setState({ comptes }));
    }

    removeLine(id) {
        compteService.deleteCompte(id)
        .then(()=>{            
            compteService.getAll().then(comptes => this.setState({ comptes }));    
            this.setState({ remove: true, message:"Suppression terminée", succed:true});         
        })
        .catch(e=>{
            this.setState({ remove: true, message:e.message, succed:false});
        })
    }

    render() {
        const { comptes, remove, message, succed } = this.state;
        let { i } = this.state;
        const content = comptes.map((compte, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{compte.nom}</td>
                <td><Link to={'/editCompte/'+compte.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><a type="button" onClick={()=>{this.removeLine(compte.id)}} style={{color: "#212529"}}><i className="fas fa-trash"></i></a></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <div className="row">
                    <h1 className='col-6'>Comptes</h1>
                    <div className='col-6'><a style={{float: 'right'}} type='button' onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left fa-lg"></i></a></div>
                </div>
                <div><Link to={'/createCompte'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
                <ToastContainer className="p-3" position='bottom-end'>
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
export { ComptePage }; 