import { useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import DayJS from 'react-dayjs';
import { Switch, Route, Redirect } from 'react-router-dom';
import getTasks from '../Filters'
import { useLocation } from 'react-router-dom';

import seeResults from '../App';

function SurveyList (props) {
    const location = useLocation();
    
    return (
        <>
            <ListGroup variant='flush'>
                {props.surveys.map( (survey) => <Survey key={`survey-${survey.id_admin+"_"+survey.id_survey}`} survey={survey} isAdmin={props.isAdmin} /*handleTaskList={props.handleTaskList}*/ />)} 
            </ListGroup>
        </>
    );
}

function Survey(props) {
    return (
        <Row >
            
            <ListGroup.Item id={props.key} className='list-group-item d-flex w-100' action>
                <Col>
                    <Row>
                        <Col xs={6}> <SurveyTitle id={props.key} title={props.survey.title} n_resp={props.survey.n_resp}/> </Col>
                        <Col xs={6}>
                        {props.isAdmin  ?
                            <Row>
                                <Col xs={2}> <SurveyResp id={props.key} n_resp={props.survey.n_resp}/> </Col>
                                <Col xs={4}> 
                                    <Button variant='primary' onClick={<seeResults questions={[props.question]} s_inter={2} />}>See Results</Button>
                                </Col>
                                <Col xs={2}> <SurveyDelete id={props.key}/> </Col>
                            </Row>
                            :
                            <></>
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

function SurveyTitle (props) {
    return (
        <Form>
            <Form.Label>{props.title}</Form.Label>
        </Form>
    );
}

function SurveyResp (props) {
    return (
        <Form>
            <Form.Label>{props.n_resp}</Form.Label>
        </Form>
    );
}

function SurveyDelete (props) {
    return (
        <div className='pr-2' onClick={() => {}/*props.handleTaskList.deleteTask(props.task.id)*/}>
                <i id={`survey-${props.id}-delete`} className='bi bi-trash text-danger' aria-label='Delete'></i>
        </div>
    );
}


export default SurveyList;