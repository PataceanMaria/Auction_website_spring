import {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";


class Login extends Component
{

    emptyItem = {
        username: '',
        password: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response)=>response.text()).then((result)=>{
            if(result!="this user doesnt exist" ){
                // result = "Bearer " + result;
                localStorage.setItem('jwt', result);
                window.location.href="/logged-home";
            }else{
                alert("Wrong credentials!")
            }
        });
    }
    render() {
        const {item} = this.state;
        return (
            <div>

                <Container>

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>

                            <Label for="name">Username</Label>
                            <Input type="text" name="username" id="username" value={item.username}
                                   onChange={this.handleChange} autoComplete="username"/>

                            <Label for="name">Password</Label>
                            <Input type="text" name="password" id="password" type="password" value={item.password}
                                   onChange={this.handleChange} autoComplete="password"/>

                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit" >Save</Button>

                        </FormGroup>
                    </Form>
                </Container>
            </div>

        );
    }
}
export default Login;