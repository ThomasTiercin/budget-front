import React from 'react';
import { typeService } from '../../_services';

class TypeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            type: {id:'',nom:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        typeService.getTypeById(this.props.match.params.id).then(type => this.setState({ type }))        
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
        const { id, type } = this.state;
        this.setState({ submitted: true });
        typeService.updateType(id, type)
        .then(
            a => {
                this.props.history.push("/types");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { type } = this.state;
        return (
            <div className="col-md-12">
                <h1>Type</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="nom">Nom :</label>
                                <input type="text" className="form-control" name="nom" defaultValue={type.nom} onChange={this.handleChange} required="required"/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Editer</button>
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
                
            </div>
        );
    }
}
export { TypeEdit }; 