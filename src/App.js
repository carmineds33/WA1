import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './Components/NavBar';
import TasksList from './Components/Task';
import LiveList from './Components/Live';
import SurveyList from './Components/Survey';
import QuestionList from './Components/Questions';
import AnswareList from './Components/Answares';
import ModalTask from './Components/ModalTask';

const fakeTasks = [ // id: 0 is "false" so we should start from 1
  { id: 1, completed: 'false', description: 'task1', important: 'true', private: 'false', deadline: '2021-04-29T12:00' },
  { id: 2, completed: 'true', description: 'task2', important: 'false', private: 'false', deadline: '' },
  { id: 3, completed: 'true', description: 'pizza', important: 'false', private: 'true', deadline: '2021-05-12T08:30' },
  { id: 4, completed: 'false', description: 'lasagna', important: 'false', private: 'false', deadline: '1999-01-01T00:00' }
];

const fakeSurveys = [
  { id_admin: 1, id_survey: 1, title: 'Sondaggio 1', n_resp: 3 },
  { id_admin: 2, id_survey: 1, title: 'Sondaggio Prova', n_resp: 0 }
];

const fakeQuestions = [
  { id_survey: 1, n_quest: 1, title: 'Prima chiusa', open: 'false', mandatory: 'false', solutions: '["Molto", "Abbastanza", "Poco"]', min: 0, max: 2 },
  { id_survey: 1, n_quest: 2, title: 'Seconda aperta', open: 'true', mandatory: 'true', solutions: '', min: 1, max: 0 },
  { id_survey: 2, n_quest: 1, title: 'Altra aperta', open: 'true', mandatory: 'false', solutions: '', min: 0, max: 0 },
];

const fakeAnswares = [
  { id_survey: 1, n_quest: 1, user: 'Pippo', open: 'false', closed_answare: 2, open_answare: '' },
  { id_survey: 1, n_quest: 2, user: 'Pippo', open: 'true', closed_answare: 0, open_answare: 'Risposta affermativa' },
  { id_survey: 1, n_quest: 1, user: 'Topolino', open: 'false', closed_answare: 0, open_answare: '' },
  { id_survey: 2, n_quest: 1, user: 'Paperino', open: 'true', closed_answare: 0, open_answare: 'Ok funziona' }

];


const filters = [
  { label: 'All', icon: 'inbox' },
  { label: 'Important', icon: 'bookmark-star' },
  { label: "Today's", icon: 'sunset' },
  { label: "Next week's", icon: 'calendar-week' },
  { label: 'Private', icon: 'eye-slash' },
];

function App() {
  const [admin, setAdmin] = useState(1);
  const [survey_interested, setSurvey_interested] = useState(1);
  const [question_interested, setQuestion_interested] = useState(1);

  const [surveys, setSurveys] = useState(fakeSurveys);
  const [questions, setQuestions] = useState(fakeQuestions);
  const [answares, setAnswares] = useState(fakeAnswares);

  const [tasks, setTasks] = useState(fakeTasks);
  const [modalTask, setModalTask] = useState({ show: false, task: undefined });
  const [search, setSearch] = useState('');

  const handleModalTask = (show, task) => {
    setModalTask({ show: show, task: task });
  }

  const handleTaskList = {
    addTask: (task) => {
      setTasks(oldTasks => [{ id: oldTasks.length + 1, completed: task.completed, description: task.description, important: task.important, private: task.private, deadline: task.deadline }, ...oldTasks]);
    },

    setEditTask: (task) => {
      handleModalTask(true, task);
    },

    editTask: (task) => {
      
      setTasks(oldTasks => oldTasks.map((t) => { return t.id === task.id ? task : t }));
    },

    deleteTask: (id) => {
      setTasks(oldTask => oldTask.filter(t => t.id !== id));
    }
  }

  
  function selectFilter(filter) {
    let icon;
    filters.forEach(f => {
      if(f.label === filter) icon = f.icon;
    });
    if (filters.map(f => f.label).includes(filter)) {
      setSearch('');
    } else {
      setSearch(filter);
    }
  }

  return (
    <Router>
      <Container fluid={true} className='pe-3 m-0'>
      <Switch>

          <Route exact path='/user'>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <SurveyList surveys={surveys} isAdmin={false}/*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
          </Route>

          <Route exact path={'/live_survey/'+ survey_interested}>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <LiveList questions={questions.filter(question => question.id_survey === survey_interested)} reviewMode={false}/*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
          </Route>

          <Route exact path='/admin'>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <SurveyList surveys={surveys.filter(survey => survey.id_admin === admin)} isAdmin={true} /*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
            <Button className='btn btn-lg btn-primary position-fixed rounded-circle' style={{ width: '3.5rem', height: '3.5rem', bottom: '2rem', right: '2rem', zIndex: '2' }} onClick={() =>{seeResults ([questions,2]) }}>
              <i className='bi bi-plus-circle-dotted text-light d-flex justify-content-center' style={{ fontSize: '2rem' }} />
            </Button>
          </Route>

          <Route exact path={'/edit_survey/'+ survey_interested}>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <QuestionList questions={questions.filter(question => question.id_survey === survey_interested)} editMode={true} /*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
            <Row>
              <Button className='btn btn-lg btn-primary position-fixed' style={{ height: '3.5rem', bottom: '2rem', right: '7rem', zIndex: '3'}} onClick={() => {}/*handleModalTask(true, undefined)*/}>
                PUBLISH
              </Button>
              <Button className='btn btn-lg btn-primary position-fixed rounded-circle' style={{ width: '3.5rem', height: '3.5rem', bottom: '2rem', right: '2rem', zIndex: '2' }} onClick={() => {}/*handleModalTask(true, undefined)*/}>
                <i className='bi bi-plus-circle-dotted text-light d-flex justify-content-center' style={{ fontSize: '2rem' }} />
              </Button>
            </Row>
          </Route>

          <Route exact path={'/results/'+ survey_interested}>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <QuestionList questions={questions.filter(question => question.id_survey === survey_interested)} editMode={false} /*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
          </Route>

          <Route exact path={'/results/'+ survey_interested +'/question_'+ question_interested}>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <AnswareList 
                    question= {questions.find(question => question.id_survey === survey_interested && question.n_quest === question_interested)}
                    answares= {answares.filter(answare => answare.id_survey === survey_interested && answare.n_quest === question_interested)} /*handleTaskList={handleTaskList} search={search}*/ />
                </Col>
              </Row>
            </Col>
          </Route>

          <Route exact path='/task'>
            <Col className='p-0 m-0'>
              <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
              <Row>
                <Col className='p-5 m-0 mr-md-4'>
                  <TasksList tasks={tasks} filters={filters} handleTaskList={handleTaskList} search={search}/>
                </Col>
              </Row>
            </Col>
            <Button className='btn btn-lg btn-primary position-fixed rounded-circle' style={{ width: '3.5rem', height: '3.5rem', bottom: '2rem', right: '2rem', zIndex: '2' }} onClick={() => handleModalTask(true, undefined)}>
              <i className='bi bi-plus-circle-dotted text-light d-flex justify-content-center' style={{ fontSize: '2rem' }} />
            </Button>
            <Modal show={modalTask.show} task={modalTask.task} handleModalTask={handleModalTask} handleTaskList={handleTaskList} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

function Modal(props) {
  if (props.show)
    return (<ModalTask show={props.show} task={props.task} handleModalTask={props.handleModalTask} handleTaskList={props.handleTaskList}></ModalTask>);
  return (<></>);
}

function seeResults(props) {
  //alert(props[0])
  return(
    <Route exact path={'/results/'}>
      <Col className='p-0 m-0'>
        <Row className='d-block bg-primary mb-5'><NavBar /*setSearch={setSearch}*//></Row>
        <Row>
          <Col className='p-5 m-0 mr-md-4'>
            <QuestionList questions={props[0].filter(question => question.id_survey === props[1])} editMode={false} /*handleTaskList={handleTaskList} search={search}*/ />
          </Col>
        </Row>
      </Col>
    </Route>
  );
}

export default App;