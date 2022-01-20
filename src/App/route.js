import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginRoute, AdminRoute } from '../_components';
import { SignupPage, HomePage, LoginPage, Logout, ComptePage, CompteEdit, CompteCreate, TypePage, TypeEdit, TypeCreate, OrganismePage, OrganismeEdit, OrganismeCreate, MouvementPage,
     MouvementEdit, MouvementCreate, CategoriePage, CategorieEdit, CategorieCreate, UserPage, UserCreate, UserEdit, EcheancePage, EcheanceEdit, EcheanceCreate, Mouvements, Statistiques} from '../App';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/signup" component={SignupPage} />
                                <LoginRoute exact path="/logout" component={Logout} />
                                <LoginRoute exact path="/comptes" component={ComptePage} />
                                <LoginRoute exact path="/editCompte/:id" component={CompteEdit} />
                                <LoginRoute exact path="/createCompte" component={CompteCreate} />
                                <AdminRoute exact path="/types" component={TypePage} />
                                <AdminRoute exact path="/editType/:id" component={TypeEdit} />
                                <AdminRoute exact path="/createType" component={TypeCreate} />
                                <AdminRoute exact path="/organismes" component={OrganismePage} />
                                <AdminRoute exact path="/editOrganisme/:id" component={OrganismeEdit} />
                                <AdminRoute exact path="/createOrganisme" component={OrganismeCreate} />
                                <LoginRoute exact path="/mouvements" component={MouvementPage} />
                                <LoginRoute exact path="/mouvement" component={Mouvements} />
                                <LoginRoute exact path="/statistiques" component={Statistiques} />
                                <LoginRoute exact path="/editMouvement/:id" component={MouvementEdit} />
                                <LoginRoute exact path="/createMouvement" component={MouvementCreate} />                                
                                <AdminRoute exact path="/echeances" component={EcheancePage} />
                                <AdminRoute exact path="/editEcheance/:id" component={EcheanceEdit} />
                                <AdminRoute exact path="/createEcheance" component={EcheanceCreate} />
                                <AdminRoute exact path="/categories" component={CategoriePage} />
                                <AdminRoute exact path="/editCategorie/:id" component={CategorieEdit} />
                                <AdminRoute exact path="/createCategorie" component={CategorieCreate} />
                                <AdminRoute exact path="/users" component={UserPage} />
                                <AdminRoute exact path="/editUser/:id" component={UserEdit} />
                                <AdminRoute exact path="/createUser" component={UserCreate} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export default App; 