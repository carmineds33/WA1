import { useState } from 'react';
import { ListGroup, Badge, InputGroup, Form, Row, Col } from 'react-bootstrap';
import DayJS from 'react-dayjs';
import { Switch, Route, Redirect } from 'react-router-dom';
import getTasks from '../Filters'
import { useLocation } from 'react-router-dom';

function LiveList (props) {
    const location = useLocation();
    
    return (
        <>
            <ListGroup variant='flush'>
                {props.questions.map( (question) => <LiveQuestion key={`question-${question.n_question}`} question={question} reviewMode={props.reviewMode} /*handleTaskList={props.handleTaskList}*/ />)} 
            </ListGroup>
        </>
    );
}

function LiveQuestion(props) {
    return (
        <Row >
            
            <ListGroup.Item id={props.key} className='list-group-item d-flex w-100' action>
                <Col>
                <Row style={{padding:'1rem'}}><Form.Label>{'Question #'+ props.question.n_quest}</Form.Label></Row>
                <Row style={{padding:'1rem'}}><QuestionTitle id={props.question.n_question} title={props.question.title}/></Row>            
                
                {(props.question.open == 'true') ?
                    <QuestionOpen id={props.question.n_question} constraint={props.question.mandatory} /*handleTaskList={props.handleTaskList}*/ />
                        :
                    <QuestionClosed id={props.question.n_question} question={props.question} /*handleTaskList={props.handleTaskList}*/ />   
                }
                </Col>
            </ListGroup.Item>
        </Row>
    );
}

function QuestionTitle (props) {
    return (
        <Form>
            <Form.Label>{props.title}</Form.Label>
        </Form>
        
    );
}

function QuestionOpen (props) {
    return (
        <Form>
            {props.constraint == 'true' ? <Badge>mandatory question</Badge> : null}
            <Form.Control></Form.Control>
        </Form>
    );
}

function QuestionClosed (props) {
    return (
        <Form>
            {<Badge>{controlConstraint([props.question.min, props.question.max])}</Badge>}

            <InputGroup>
            <Col>
                {
                    JSON.parse(props.question.solutions).map((element, index) => {
                        return (
                            
                                <Row style={{margin:'1em'}}>
                            <InputGroup.Checkbox value={index}/>
                            <span style={{marginLeft:'1em'}}>{element}</span>
                                </Row>
                            
                        );
                        
                    })
                }
            </Col>
            </InputGroup>
        </Form>
        
    );
}


function controlConstraint(props) {
    if (props[0] == 0 && props[1] == 1)
        return 'optional question, single-choice'
    else if (props[1] == 0 && props[1] == 1)
        return 'mandatory question, single-choice'
    else if (props[0] == 0 && props[1] > 1)
        return 'optional question, multiple-choice ('+ props[1] +')'
    else if (props[1] == 0 && props[1] > 1)
        return 'mandatory question, multiple-choice ('+ props[1] +')'
}


export default LiveList;