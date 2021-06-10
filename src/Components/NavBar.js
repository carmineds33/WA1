import { Nav, Navbar, Form, FormControl, Image, Row, Col} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();

    return (
        <>
            <Navbar bg='primary' expand='lg' fixed='top'>
                <Navbar.Brand>
                    <span style={{ fontSize: '2rem', color:'white', marginLeft:'1rem'}}>SEURVEY APP</span>
                </Navbar.Brand>
                <Navbar.Toggle style={{border:'none'}} >
                    <i className='bi bi-list-nested text-light' aria-label='Home' style={{ fontSize: '1.5rem' }}></i>
                </Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Search /*setFilter={props.setFilter} ilters={props.filters}*//>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>);
}

function Search (props) {
    return (
        <Nav.Link id='filter-search' className='pl-3 btn-primary text-light' style={{ fontSize: '1.5em' }} title='Search'>
            <Row>
                <Col xs={1}><i className='bi bi-search'></i></Col>
                <Col>
                    <Form inline>
                        <FormControl 
                            type='text' 
                            placeholder='Type to filter...' 
                            className='w-100' 
                            /*onChange={(e) => {
                                if(e.target.value.length <= 15) props.setFilter(e.target.value);
                            }}*/
                            
                            />
                    </Form>
                </Col>
            </Row>
        </Nav.Link>
    );
}

export default NavBar;