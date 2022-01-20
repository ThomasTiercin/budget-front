import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            applicationName: "Budget'Air",
            creator : "ThomasTiercin"
        };
    }    
    render() {
        const { year, applicationName,creator } = this.state;
        return (
            
            <footer className="main-color mt-auto p-3 text-center second-color-font">    
                <div className="container ">
                © {year} - {applicationName} by 
                <a> </a>
                <a className="second-color-font" href="https://fr.linkedin.com/in/thomas-tiercin">{creator}</a>
                </div>
            </footer>
        )
    }
}

export default Footer ; 