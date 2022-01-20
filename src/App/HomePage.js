import React from 'react';
import { mouvementService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouvements: [],
            userId: ''
        };        
    }

    componentDidMount() {
        const id = localStorage.getItem('id').substring(1,localStorage.getItem('id').length-1)
        mouvementService.getMouvementByUserId(id).then(mouvements => this.setState({ mouvements }));
        this.state.userId = id;  
    }

    render() {
        let { mouvements } = this.state;        
        return (
            <div className="album py-5">
                <h4 className="display-4 text-center second-color-font">Bienvenue sur Budget'Air</h4>
                <div className="container">
                    <br/>
                    <h4>Derniers mouvements</h4>
                    <div className="row row-cols-1 g-3">
                        {mouvements.map((mouvement, index) => {
                            if (index <= 4) {
                                return (
                                    <div className="col" key={index}>
                                        <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                            <div className="card-body">
                                                <div className="d-flex flex-row justify-content-xs-between">
                                                    <span className="col-sm-2 d-flex  align-items-center"><img style={{height: "1.5rem"}} src={mouvement.organisme.image} /></span>
                                                    <span className="col-sm-8 d-flex  align-items-center" style={{fontWeight: "bold"}}>{mouvement.nom}</span>
                                                    {mouvement.montant >= 0 &&
                                                        <span className="col-sm-2 d-flex flex-row-reverse align-items-center text-success" style={{fontWeight: "bold"}}>{mouvement.montant}€</span>
                                                    }
                                                    {mouvement.montant < 0 &&
                                                        <span className="col-sm-2 d-flex flex-row-reverse align-items-center text-danger" style={{fontWeight: "bold"}}>{mouvement.montant}€</span>
                                                    }
                                                </div>                                       
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export { HomePage };