import React from 'react';
import { echeanceService, typeService, organismeService, compteService} from '../../_services';

class EcheanceCreate extends React.Component {
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

    componentDidMount(e) {
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
        const { echeance } = this.state;
        this.setState({ submitted: true });
        echeanceService.createEcheance(echeance)
        .then(
            a => {
                this.props.history.push("/echeances");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { types } = this.state;
        return (
            <div className="col-md-12">
                <h1>Ajouter un échéance </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="typeId">Type :</label>
                        <select className="form-select" name="typeId" onChange={this.handleChange}>
                            <option selected>Select a type</option>
                            {types.map((type, index) =>
                                <option key={type.id} value={type.id}>{type.nom}</option>
                            )}
                        </select>
                        <label htmlFor="date">Date :</label>
                        <input type="datetime-local" className="form-control" name="date" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Créer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
            </div>
        );
    }
}
export { EcheanceCreate }; 