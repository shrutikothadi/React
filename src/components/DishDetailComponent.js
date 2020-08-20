import React, {Component}  from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem, Alert, Label,Button,Row,Col,Modal,ModalHeader,ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModelOpen:false,
            alert:false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleAlert=this.toggleAlert.bind(this);
    }

    toggleModal(){
        this.setState({
            isModelOpen:!this.state.isModelOpen
        })
    };

    handleSubmit(values){
        console.log("Form Values::" , JSON.stringify(values));
        this.setState({
            alert:true
        })
        this.props.postComment(this.props.dishId,values.rating,values.name,values.comment)
        
    }

    toggleAlert(){
        this.setState({
            alert:!this.state.alert
        })
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
                                    <Button type="submit" color="primary" onClick={this.toggleModal}> Submit</Button>
                                </Row>
                            </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.alert}>
                        <Alert color="primary" isOpen={this.state.alert} toggle={this.toggleAlert}>Comment Submitted Successfully</Alert>
                    </Modal>
                   </div>
            </div>
        )
    }
}



    function RenderDish({dish}){        

        if(dish){
            var cardDetails = (
                <div >
                    <FadeTransform in 
                         transformProps = {{
                                 exitTransform : 'scale(0.5 translateY(-50%)'
                    }}>
                    <Card >
                  <CardImg width="100%" src={baseUrl +'/'+ dish.image} alt={dish.name}></CardImg>
                     <CardBody>
                         <CardTitle>{dish.name}</CardTitle>
                         <CardText>{dish.description}</CardText>
                     </CardBody>
                 </Card>
                 </FadeTransform>
                </div>
            )
        }else{
            cardDetails=null;
        }
        return (
            <div>
                {cardDetails}
            </div>
        )
        
    }

    function RenderComments({comments, postComment,dishId}){
        console.log("comments::",comments );
        if(comments){
            var dishComments = comments.map((comment)=>{
                return(
                    <div>
                        <Stagger in>
                            <Fade in>
                                <div>{comment.comment}</div><br/>
                                <div>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric', month : 'short' , day : '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                                <br/>
                            </Fade>
                        </Stagger>
                    </div>
                    
                )
            });
        }
        if(comments){
            var commentsHeading = <h3>Comments</h3>
        }else{
            commentsHeading=null
        }
        return (
            <div>
                     {commentsHeading}<br/>
                        <div>{dishComments}</div>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                 </div>
        )

    }

    const DishDetail = (props) => { 
        
        if(props.isLoading){
            return(
                <div className="container">
                        <div className = "row">
                            <Loading />
                        </div>
                </div>
            )
        }
        else if(props.errMess){
            return (
                <div className = "container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish!=null){
        return(
            
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem ><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">                           
                    <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                     <RenderComments comments={props.comments} 
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                     </div>
                 </div>
                </div> 
        )       
    }
}


export default DishDetail;