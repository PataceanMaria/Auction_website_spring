import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Client} from "@stomp/stompjs";

class Test extends Component{
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

            fetch('send_product', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify("update was made"),
            }).then((response)=>response.text());


        console.log(this.state.messages);

    }
    render() {
        const {product} = this.state;
        const {item} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>

                <Input type="text" name="bid" id="bid" value={item.bid}
                       onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Button color="primary" type="submit">Place a bid</Button>

            </FormGroup>
        </Form>)
    }
}
export default withRouter(Test);