import React, { Component } from 'react';
import { Container, Col, Navbar} from 'react-bootstrap';


export default class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();
        // const mainFooter = {
        //         color: "white",
        //         backgroundColor: "#343a40",
        //         paddingTop: "1em",
        //         position: "relative",
        //         bottom: "0",
        //         textAlign: "center",
                
        //         width: "100%"
                
        // }
        return (
                <Navbar  fixed="bottom" bg="dark" variant="dark">
                
                <Container >
                    
                    <Col className="text-muted text-center">
                        <div className="copyright " >
                            &copy;{fullYear} - {fullYear + 1}, All Rights Reserved by E-Bug Tracker</div>
                    </Col>
                    
                </Container>
                 
                 </Navbar>
        );
    }
}
