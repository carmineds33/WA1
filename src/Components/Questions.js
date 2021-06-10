import { useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import DayJS from 'react-dayjs';
import { Switch, Route, Redirect } from 'react-router-dom';
import getTasks from '../Filters'
import { useLocation } from 'react-router-dom';

function QuestionsList (props) {
    const location = useLocation();
    
    return (
        <>
            <ListGroup variant='flush'>
                {props.questions.map( (question) => <Question key={`question-${question.n_question}`} question={question} editMode={props.editMode} /*handleTaskList={props.handleTaskList}*/ />)} 
            </ListGroup>
        </>
    );
}

function Question(props) {
    return (
        <Row >
            
            <ListGroup.Item id={props.key} className='list-group-item d-flex w-100' action>
                <Col>
                    <Row>
                        <Col xs={8}> <QuestionTitle id={props.question.n_question} title={props.question.title}/> </Col>
                        <Col xs={4}>
                            {props.editMode ?
                                <QuestionControls id={props.question.n_question} question={props.question} /*handleTaskList={props.handleTaskList}*/ />
                                        :
                                <QuestionResult id={props.question.n_question} question={props.question} /*handleTaskList={props.handleTaskList}*/ />   
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

function QuestionTitle (props) {
    return (
        <Form>
            <Form.Label>{props.title}</Form.Label>
        </Form>
    );
}

function QuestionControls(props) {
    return (
        <Row>
            <div className='pr-2' onClick={() => {}/*props.handleTaskList.setEditTask(props.task)*/}>
                <i id={`question-${props.key}-edit`} className='bi bi-pencil-square text-primary' aria-label='Edit'></i>
            </div>
            <div className='pr-2' onClick={() => {}/*props.handleTaskList.deleteTask(props.task.id)*/}>
                <i id={`question-${props.key}-delete`} className='bi bi-trash text-danger' aria-label='Delete'></i>
            </div>
            <div className='pr-2' onClick={() => {}/*props.handleTaskList.deleteTask(props.task.id)*/}>
                <i id={`question-${props.key}-up`} className='bi bi-arrow-up text-primary' aria-label='Up'></i>
            </div>
            <div className='pr-2' onClick={() => {}/*props.handleTaskList.deleteTask(props.task.id)*/}>
                <i id={`question-${props.key}-down`} className='bi bi-arrow-down text-primary' aria-label='Down'></i>
            </div>
        </Row>
    );
}

function QuestionResult (props) {
    return (
        <Button variant='secondary'>See answares</Button>
    );
}


export default QuestionsList;