import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/Activities").then(response => {
      setActivities(response.data);
    })
  }, []);

  function handleSelectedActivity (id: string) {
    setSelectedActivity(activities.find(x => x.id == id));
  }

  function handleCancelSelectedActivity () {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose () {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
      {/* <Header as='h2' icon='users' content='Reactivities'/> */}
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities = {activities}
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectedActivity}
          cancelselectActivity = {handleCancelSelectedActivity}

          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}

          createOredit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
