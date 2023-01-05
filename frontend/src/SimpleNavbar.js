import {Component} from "react";
import "./App.css";
import "./ProductList"
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class SimpleNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    handleClick = () => {
        localStorage.removeItem('jwt');
        window.location.href="/";
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <header>
                <div className="logo"><a href="/">Alligators</a></div>
                <div className="menu">
                    <a href="#">
                        <ion-icon name="close" className="close"></ion-icon>
                    </a>

                </div>
                <div className="heading">
                    <ul>
                        <li><a href="/products/new" className="under">SELL</a></li>
                        <li><a href="#" className="under">CATEGORIES</a></li>
                        <li><a href="#" className="under">HELP</a></li>
                        <li><a href="#" className="under">CONTACT US</a></li>
                        <li><a href="#" className="under">ABOUT US</a></li>
                        <li><a href="/" className="under">LOG OUT</a></li>
                    </ul>
                </div>
                <div className="heading">
                    <ion-icon name="menu" className="ham"></ion-icon>
                </div>

            </header>
        );
    }

}