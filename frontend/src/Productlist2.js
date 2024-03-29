import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import "./cardstyle.css"
import logo from "./AutoplaySlider/favicon.ico";

class ProductList2 extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};

    }

    componentDidMount() {
        fetch('/products')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }



    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const productList = products.map(product => {
            return <div class="items" key={product.id}>


                <img src={logo} className="App-logo" alt="logo"  />


                <div className="name">
                    {product.name} </div>

                <div className="info">{product.description}</div>
                <div className="price">PRICE: {product.price}$</div>
                <a href={`/products_page_not_logged/${product.id}`} className="btn"> DETAILS
                </a>


            </div>

        });
        return (
            <div>

                <div className="section2">
                    <div className="container">
                        {productList}

                    </div>
                </div>
            </div>

        );

    }

}

export default ProductList2;