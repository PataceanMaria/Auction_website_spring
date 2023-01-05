import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';


class Bid extends Component {
    emptyItem = {
        name: '',
        price:'',
        description:'',
        image:''
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
        console.log(this.props);
        if (this.props.match.params.id !== 'new') {
            const product = await (await fetch(`/products_update/${this.props.match.params.id}`)).json();
            this.setState({item: product});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const price = target.price;
        let item = {...this.state.item};
        item[price] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/products_page' + item.id , {
            method: 'PUT' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push(`/products_page/${item.id}`);
    }


    render() {
        const {item} = this.state;


        const title = <h2>{item.id ? 'Edit Product' : 'Add Product'}</h2>;

        return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>

                        <Label for="name">Price</Label>
                        <Input type="text" name="price" id="price" value={item.price}
                               onChange={this.handleChange} autoComplete="description"/>

                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>)
    }

}

export default withRouter(Bid);