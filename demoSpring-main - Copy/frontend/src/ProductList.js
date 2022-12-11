import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import "./cardstyle.css"

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/products')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }


    async remove(id) {
        await fetch(`/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updateProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updateProducts});
        });
    }

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const productList = products.map(product => {
            return <div class="items" key={product.id}>


                <div className="name">{product.name}</div>
                <div className="price">{product.price}</div>
                <div className="info">{product.description}</div>


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

export default ProductList;