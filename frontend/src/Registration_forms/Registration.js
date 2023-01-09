import React,{Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import "./style.css";



class Registration extends Component {
    emptyItem = {
        name: '',
        username:'',
        email:'',
        password:''
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

            const product = await (await fetch(`/products/${this.props.match.params.id}`)).json();
            this.setState({item: product});

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const username = target.username;
        const email = target.email;
        const passwrod = target.passwrod;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/users' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response)=>response.text()).then((result)=>{
            if(result=="User created"){
                alert("Account created");
            }else{
                alert("Something went wrong!");
            }
        });
        window.location.href = "/";
    }


    render() {
        const {item} = this.state;




        return (<div>

            <Container>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name}
                               onChange={this.handleChange} autoComplete="name"/>
                        <Label for="name">Username</Label>
                        <Input type="text" name="username" id="username" value={item.username}
                               onChange={this.handleChange} autoComplete="username"/>
                        <Label for="name">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email}
                               onChange={this.handleChange} autoComplete="email"/>
                        <Label for="name">Password</Label>
                        <Input type="password" name="password" id="password" value={item.password}
                               onChange={this.handleChange} autoComplete="password"/>


                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Sign in</Button>

                    </FormGroup>
                </Form>
            </Container>
        </div>)
    }

}

export default withRouter(Registration);