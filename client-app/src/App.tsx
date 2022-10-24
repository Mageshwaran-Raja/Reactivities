import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get("https://localhost:5001/Activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((act:any) => (
          <List.Item key={act.id}>
            {act.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
