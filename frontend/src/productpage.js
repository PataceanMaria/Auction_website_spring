
import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import "./AppNavbar";
import AppNavbar from "./AppNavbar";
import "./product_page.css";
import "./script.js";



class Productpage extends Component{
    emptyItem = {
        name: '',
        price:'',
        description:''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        const product = await (await fetch(`/products_page/${this.props.match.params.id}`)).json();
        this.setState({item: product});

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/products_page' +  item.id,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

    }


    render() {
        const {item} = this.state;


        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Product Card/Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="style.css"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                      integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                      crossOrigin="anonymous"/>
            </head>
            <body>

            <AppNavbar/>
            <div className="card-wrapper">
                <div className="card">

                    <div className="product-imgs">
                        <div className="img-display">
                            <div className="img-showcase">
                                <img src="shoe_1.jpg" alt="shoe image"/>
                                <img src="shoe_2.jpg" alt="shoe image"/>
                                <img src="shoe_3.jpg" alt="shoe image"/>
                                <img src="shoe_4.jpg" alt="shoe image"/>
                            </div>
                        </div>
                        <div className="img-select">
                            <div className="img-item">
                                <a href="#" data-id="1">
                                    <img src="shoe_1.jpg" alt="shoe image"/>
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="#" data-id="2">
                                    <img src="shoe_2.jpg" alt="shoe image"/>
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="#" data-id="3">
                                    <img src="shoe_3.jpg" alt="shoe image"/>
                                </a>
                            </div>
                            <div className="img-item">
                                <a href="#" data-id="4">
                                    <img src="shoe_4.jpg" alt="shoe image"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="product-content">
                        <h2 className="product-title">{item.name}</h2>
                        <a href="#" className="product-link">visit nike store</a>
                        <div className="product-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div className="product-price">
                            <p className="new-price">Price: <span>{item.price}$</span></p>
                        </div>

                        <div className="product-detail">
                            <h2>about this item: </h2>
                            <p>{item.description}</p>

                        </div>

                        <div className="purchase-info">
                            <input type="number" min="0" value="1"/>
                            <button type="button" className="btn">
                               Place a bid
                            </button>

                        </div>


                    </div>
                </div>
            </div>


            <script src="script.js"></script>
            </body>
            </html>

        )
    }

}
export default withRouter(Productpage);