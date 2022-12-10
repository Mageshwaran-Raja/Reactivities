import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetail from '../../features/activities/details/ActivityDetail';

function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/activities' element={ <ActivityDashboard /> } />
        <Route path='/activities/:id' element={ <ActivityDetail /> } />
        {['/createActivity', '/manage/:id'].map((path) => {
          return <Route key={location.key} path = {path} element={ <ActivityForm key={location.key}/> } />
        })}
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
