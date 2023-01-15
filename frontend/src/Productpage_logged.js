

import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import "./AppNavbar";
import AppNavbar from "./AppNavbar";
import "./product_page.css";
import "./script.js";
import {Client} from "@stomp/stompjs";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class Productpage_logged extends Component{
    emptyItem = {
        bid:'',
    };

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            products: [],
            messages: '',
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`/products_page/${id}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));

        let currentComponent = this;


        let onConnected = () => {
            console.log("Connected!!")
            client.subscribe(`/topic/${this.props.match.params.id}`, function (msg) {
                console.log(msg);
                if (msg.body) {
                    let jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        currentComponent.setState({ messages: jsonBody.message })
                    }
                }
            });
        }
        /*let onConnected = () => {
            console.log("Connected!!")
            client.subscribe(`{/topic/${this.props.match.params.id}`, function (msg) {
                if (msg.body) {
                    let jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        console.log(jsonBody.message);
                        currentComponent.setState({ messages: jsonBody.message })
                    }
                }
            });
        }*/
        let onDisconnected = () => {
            console.log("Disconnected!!")
        }

        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 1000,
            heartbeatIncoming: 1000,
            heartbeatOutgoing: 1000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });

        client.activate();
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
        const { product } = this.state;
        const { id } = this.props.match.params;

        if(parseInt(item.bid)<parseInt(product.price)){
            alert("You must bid with a higher price!");
        }else{
            await fetch(`/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({price: item.bid})
            });
        }

        console.log("S-a facut update!");

        fetch(`/products_page/${id}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));
        console.log("bid: "+item.bid);
        console.log("product price: "+product.price);
        if(parseInt(item.bid)>parseInt(product.price)){
            fetch('http://localhost:8080/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:id,price:item.bid}),
            }).then((response)=>response.text());
        }
        fetch('send_product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({price:item.bid}),
        }).then((response)=>response.text());
        console.log(this.state.messages);

    }


    render() {
        const {product} = this.state;
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
                            <h2 className="product-title">{product.name}</h2>
                            <a href="#" className="product-link">Product lifetime</a>
                            <div className="product-rating">

                            </div>

                            <div className="product-price">
                                <p className="new-price">Price: <span>{product.price}</span></p>
                            </div>

                            <div className="product-detail">
                                <h2>about this item: </h2>
                                <p>{product.description}</p>

                            </div>


                        </div>
                    </div>
                </div>


                <script src="script.js"></script>
                </body>
                </html>

            )}


}
export default withRouter(Productpage_logged);


/*import {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {Client} from "@stomp/stompjs";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class Productpage extends Component{
    emptyItem = {
        bid:'',
    };

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            products: [],
            messages: '',
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`/products_page/${2}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));

        let currentComponent = this;

        let onConnected = () => {
            console.log("Connected!!")
            client.subscribe('/topic/message', function (msg) {
                if (msg.body) {
                    let jsonBody = JSON.parse(msg.body);
                    if (jsonBody.message) {
                        currentComponent.setState({ messages: jsonBody.message })
                    }
                }
            });
        }

        let onDisconnected = () => {
            console.log("Disconnected!!")
        }

        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 1000,
            heartbeatIncoming: 1000,
            heartbeatOutgoing: 1000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });

        client.activate();
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
        const { product } = this.state;
        const { id } = this.props.match.params;

        if(parseInt(item.bid)<parseInt(product.price)){
            alert("You must bid with a higher price!");
        }else{
            await fetch(`/products/${2}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({price: item.bid})
            });
        }

        console.log("S-a facut update!");

        fetch(`/products_page/${2}`)
            .then(response => response.json())
            .then(data => this.setState({product:data}));
        console.log("bid: "+item.bid);
        console.log("product price: "+product.price);
        if(parseInt(item.bid)>parseInt(product.price)){
            fetch('http://localhost:8080/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({price:item.bid}),
            }).then((response)=>response.text());
        }

        console.log("S-a trimis mesajul!");
    }


    render() {
        const { item } = this.state;
        return(
            <div className="card-wrapper">
                <div className="card">
                    <div className="product-price">
                        <p className="new-price">Price:{this.state.messages}</p>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="text" name="bid" id="bid" value={item.bid}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Place a bid</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )*/
// if(this.state.messages){
//     return (
//         <div className="card-wrapper">
//             <div className="card">
//                 <div className="product-price">
//                     <p className="new-price">Price: <span>{this.state.message}</span></p>
//                 </div>
//                 <Form onSubmit={this.handleSubmit}>
//                     <FormGroup>
//                         <Input type="text" name="bid" id="bid" value={item.bid}
//                                onChange={this.handleChange} autoComplete="bid"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Button color="primary" type="submit">Place a bid</Button>
//                     </FormGroup>
//                 </Form>
//             </div>
//         </div>
//     )
// }else{
//     return (
//         <div className="card-wrapper">
//             <div className="card">
//                 <div className="product-price">
//                     <p className="new-price">Price: <span>{product.price}</span></p>
//                 </div>
//                 <Form onSubmit={this.handleSubmit}>
//                     <FormGroup>
//                         <Input type="text" name="bid" id="bid" value={item.bid}
//                                onChange={this.handleChange} autoComplete="bid"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Button color="primary" type="submit">Place a bid</Button>
//                     </FormGroup>
//                 </Form>
//             </div>
//         </div>
//     )
// }
/*   }*/

/*}
export default withRouter(Productpage);*/
