import { useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import DayJS from 'react-dayjs';
import { Switch, Route, Redirect } from 'react-router-dom';
import getTasks from '../Filters'
import { useLocation } from 'react-router-dom';

function AnswareList (props) {
    const location = useLocation();
    
    return (
        <>
            <Form><Form.Label>{props.question.title}</Form.Label></Form>
            <ListGroup variant='flush'>
                {props.answares.map( (answare) => <Answare key={`answare-${answare.id_survey+'_'+answare.n_quest}`} question={props.question} answare={answare}/*handleTaskList={props.handleTaskList}*/ />)} 
            </ListGroup>
        </>
    );
}

function Answare(props) {
    return (
        <Row >
            
            <ListGroup.Item id={props.key} className='list-group-item d-flex w-100' action>
                <Col>
                    <Row>
                        <Col xs={8}> <AnswareUser id={props.answare.id_survey+'_'+props.answare.n_quest} user={props.answare.user}/> </Col>
                        <Col xs={4}>
                            {(props.answare.open == 'true') ?
                                <AnswareText id={props.answare.id_survey+'_'+props.answare.n_quest} text={props.answare.open_answare} /*handleTaskList={props.handleTaskList}*/ />
                                        :
                                <AnswareClosed id={props.answare.id_survey+'_'+props.answare.n_quest} options={props.question.solutions} choice={props.answare.closed_answare} /*handleTaskList={props.handleTaskList}*/ />   
                            }
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} className='d-inline-flex flex-row-reverse'>
                    <Row>
                    
                    </Row>
                </Col>
            </ListGroup.Item>
        </Row>
    );
}

function AnswareUser (props) {
    return (
        <Form>
            <Form.Label>{props.user}</Form.Label>
        </Form>
    );
}

function AnswareText (props) {
    return (
        <Form>
            <Form.Label>{props.text}</Form.Label>
        </Form>
    );
}

function AnswareClosed (props) {
    return (
        <Form>
            <Form.Label>{JSON.parse(props.options)[props.choice]}</Form.Label>
        </Form>
    );
}

export default AnswareList;