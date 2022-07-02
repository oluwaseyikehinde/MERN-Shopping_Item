import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { FaTrash } from "react-icons/fa";



class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        const {items} = this.props.item;
            return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="items">
                                {name}
                                {this.props.isAuthenticated ? (
                                    <Button
                                    className="remove-btn float-right"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                         <FaTrash/>
                                </Button>    
                                ) : null
                                }
                                   
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>  
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);