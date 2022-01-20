import React from 'react';
import { echeanceService, typeService, organismeService, compteService} from '../../_services';

class EcheanceEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            echeance: {date:'',typeId:''},
            types: [],
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        echeanceService.getEcheanceById(this.props.match.params.id).then(echeance => this.setState({ echeance })) 
        typeService.getAll().then(types => this.setState({ types })); 
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.echeance,
            echeance: { ...this.state.echeance, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, echeance } = this.state;
        this.setState({ submitted: true });
        echeanceService.updateEcheance(id, echeance)
        .then(
            a => {
                this.props.history.push("/echeances");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { types, echeance } = this.state;
        return (
            <div className="col-md-12">
                <h1>Echeance</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="typeId">Type :</label>
                        <select className="form-select" name="typeId" onChange={this.handleChange}>
                            {types.map((type, index) =>
                                <option key={type.id} selected={echeance.typeId == type.id} value={type.id}>{type.nom}</option>
                            )}
                        </select>
                        <label htmlFor="name">Date :</label>
                        <input type="datetime-local" className="form-control" name="date" value={echeance.date} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>                
            </div>
        );
    }
}
export { EcheanceEdit }; 