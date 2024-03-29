import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import SimpleNavbar from "./SimpleNavbar";


class ProductEdit extends Component {
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
            const product = await (await fetch(`/products/${this.props.match.params.id}`)).json();
            this.setState({item: product});
        }
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

        await fetch('/products' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response)=>response.text()).then((result)=>{
            if(result=="Product created"){
                alert("Product added successfully!");
            }else{
                alert("Something went wrong!");
            }
        });
    }


    render() {
        const {item} = this.state;

        return (<div>
            <SimpleNavbar/>
            <Container>

                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name}
                               onChange={this.handleChange} autoComplete="name"/>
                        <Label for="name">Description</Label>
                        <Input type="text" name="description" id="description" value={item.description}
                               onChange={this.handleChange} autoComplete="description"/>
                        
                        <Label for="name">Price</Label>
                        <Input type="text" name="price" id="price" value={item.price}
                               onChange={this.handleChange} autoComplete="description"/>
                        <Input type="file" name="image" id="image" value={item.image}
                               onChange={this.handleChange} />

                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                    </FormGroup>
                </form>
            </Container>
        </div>)
    }

}

export default withRouter(ProductEdit);