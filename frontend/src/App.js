
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {Component} from "react";
import Home from './Home'
import ProductList from "./ProductList";
import ProductEdit from "./ProductEdit";
import Productpage from "./productpage";
import Register from "./Registration_forms/Registration";



class App extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
        const response = await fetch('/products');
        const body = await response.json();
        this.setState({products: body});
        const response2=await fetch('/users');
        const body2=await response.json();
        this.setState({users:body});
    }


    // render() {
    //     const {products} = this.state
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo"/>
    //                 <div className="App-intro">
    //                     <h2>Products</h2>
    //                     {products.map(product =>
    //                         <div key={product.id}>
    //                             {product.name}
    //                         </div>
    //                     )}
    //                 </div>
    //             </header>
    //         </div>
    //     );
    // }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true}><Home/></Route>
                    <Route path='/products' exact={true}><Home/></Route>
                    <Route path='/products_page/:id'><Productpage/></Route>

                    <Route path='/products/:id'><ProductEdit/></Route>

                </Switch>
            </Router>
        )
    }
}

export default App;