import React from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";

const ItemList = ({queue}) => {
    return (
        <Container className="item-list position-relative">
            <Card>
                <Card.Body>
                    <Card.Title className={'text-center'}>Queue</Card.Title>
                </Card.Body>
            </Card>
            <ListGroup as="ul" variant="primary">
                    {queue.map((item) =>
                        <ListGroup.Item as="li" >{item.number+'.\t'+item.name}</ListGroup.Item>
                    )}
            </ListGroup>
        </Container>
    );
};

export default ItemList;

