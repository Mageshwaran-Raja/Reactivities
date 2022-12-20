import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetail from '../../features/activities/details/ActivityDetail';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const location = useLocation();
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/activities' element={ <ActivityDashboard /> } />
        <Route path='/activities/:id' element={ <ActivityDetail /> } />
        {['/createActivity', '/manage/:id'].map((path) => {
          return <Route key={location.key} path = {path} element={ <ActivityForm key={location.key}/> } />
        })}
        <Route path='/errors' element={ <TestErrors /> } />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
