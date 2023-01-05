import {Component} from "react";
import './App.css'
import "./ProductEdit";
import {Link} from 'react-router-dom';
import {Button, Container} from "reactstrap";
import { withRouter } from 'react-router-dom'
import productList from "./ProductList";
import ProductEdit from "./ProductEdit";
import ProductList from "./ProductList";
import Slider from "./AutoplaySlider/Slider";
import AppNavbar from "./AppNavbar";


class Home extends Component  {



    render() {
        return (<body>

    <AppNavbar/>

        <section>
            <div className="section">
                <div className="section1">

                    {
                        <Slider/>
                    }
                </div>
                <div className="section2">

                    <div className="container"  >
                        <ProductList/>


                    </div>

                </div>
            </div>

        </section>
        <footer>
            <div className="footer0">
                <h1>Alligator</h1>
            </div>
            <div className="footer1 ">
                Connect with us at
                <div className="social-media">
                    <a href="#">

                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                    <a href="#">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                </div>
            </div>
            <div className="footer2">
                <div className="product">
                    <div className="heading">Products</div>
                    <div className="div">Sell your Products</div>
                    <div className="div">Advertise</div>
                    <div className="div">Pricing</div>
                    <div className="div">Product Buisness</div>

                </div>
                <div className="services">
                    <div className="heading">Services</div>
                    <div className="div">Return</div>
                    <div className="div">Cash Back</div>
                    <div className="div">Affiliate Marketing</div>
                    <div className="div">Others</div>
                </div>
                <div className="Company">
                    <div className="heading">Company</div>
                    <div className="div">Complaint</div>
                    <div className="div">Careers</div>
                    <div className="div">Affiliate Marketing</div>
                    <div className="div">Support</div>
                </div>
                <div className="Get Help">
                    <div className="heading">Get Help</div>
                    <div className="div">Help Center</div>
                    <div className="div">Privacy Policy</div>
                    <div className="div">Terms</div>
                    <div className="div">Login</div>
                </div>
            </div>
        </footer>
    </body>

    );
    }
}

export default Home;