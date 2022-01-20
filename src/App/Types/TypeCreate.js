import React from 'react';
import { typeService } from '../../_services';

class TypeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            type: {nom:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.type,
            type: { ...this.state.type, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { type } = this.state;
        this.setState({ submitted: true });
        typeService.createType(type)
        .then(
            a => {
                this.props.history.push("/types");
            },
            error => this.setState({ error })
        )
    }

    render() {
        return (
            <div>
                <h1>Ajouter un type </h1>
                <div className="container">  
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className='row'>
                            <div className="col-md-6">
                                <div className='form-group'>
                                    <label htmlFor="nom">Nom :</label>
                                    <input type="text" className="form-control" name="nom" onChange={this.handleChange} required="required"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Créer</button>
                        <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
                    </form>
                </div>
            </div>
        );
    }
}
export { TypeCreate }; 