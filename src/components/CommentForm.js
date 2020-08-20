import React ,{ Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import {Control, LocalForm , Errors} from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModelOpen:false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModelOpen:!this.state.isModelOpen
        })
    };

    handleSubmit(values){
        console.log("Form Values::" , JSON.stringify(values));
        alert(JSON.stringify(values));
    }

    render(){
        return (
            <div>
                <div>
                <Button className="fa fa-edit fa-lg" onClick={this.toggleModal} > Submit Comment </Button>
                </div>
                <div>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="m-3">
                            <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label className="form-group">  Rating</Label>
                                    <Control.select model=".rating" 
                                                  id="rating"
                                                  name="rating"
                                                  className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="name"> Your Name </Label>
                                    <Control.text model=".name"
                                                  id="name"
                                                  name="name"
                                                  className="form-control"
                                                  placeholder="Your Name"
                                                  validators={{
                                                      minLength:minLength(3),
                                                      maxLength:maxLength(15)
                                                  }}
                                                  />
                                    <Errors className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                minLength:"Must be greater than two  characters",
                                                maxLength:"Must be less than or equal to 15 characters"
                                            }}>

                                    </Errors>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="comment"> Comment</Label>
                                    <Control.textarea model=".comment"
                                                      id="comment"
                                                      name="comment"
                                                      rows="6"
                                                      className="form-control" />
                                </Row>
                                <Row>
                                    <Button type="submit" color="primary"> Submit</Button>
                                </Row>
                            </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default CommentForm;

