import React from 'react';
import { organismeService } from '../../_services';
import firebase from '../../firebase';

class OrganismeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            organisme: {nom:'', image:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.organisme,
            organisme: { ...this.state.organisme, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { organisme } = this.state;
        this.setState({ submitted: true });
        organismeService.createOrganisme(organisme)
        .then(
            a => {
                this.props.history.push("/organismes");
            },
            error => this.setState({ error })
        )
    }

    handleUpload(e){
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
            let file = e.target.files[0];
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var uploadTask = storageRef.child('organismes/' + file.name).put(file);
        
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                this.setState({progress})
            },(error) =>{
                throw error
            },() =>{
                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                this.setState({
                    downloadURL: url,
                    ...this.organisme,
                    organisme: { ...this.state.organisme, image: url }
                })
                })
            document.getElementById("file").value = null
            }
        ) 
        }
      }

    render() {
        let { organisme } = this.state;
        return (
            <div className="col-md-12">
                <h1>Ajouter un organisme </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="col-md-6">
                        <img
                            className="ref"
                            src={organisme.image || "https://via.placeholder.com/400x300"}
                            alt="Uploaded Images"
                            height="300"
                            width="auto"
                            />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="nom">Nom :</label>
                        <input type="text" className="form-control" name="nom" onChange={this.handleChange} required="required"/>
                        <input type="file" accept='image/*' id="file" onChange={this.handleUpload} className="form-control"/>
                        <div className="progress" style={{width: '100%'}}>
                            <div className="progress-bar bg-success" role="progressbar" style={{width: this.state.progress+'%'}} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Créer</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Retour</button>
            </div>
        );
    }
}
export { OrganismeCreate }; 