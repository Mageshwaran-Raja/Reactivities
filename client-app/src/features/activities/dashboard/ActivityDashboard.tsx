import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard () {

    const {activityStore} = useStore();   
    const {selectedActivity, editMode} = activityStore; 
    return (
        <Grid>
            <Grid.Column width='10'>
                {/* <List>
                    {activities.map(act => (
                        <List.Item key={act.id}>
                            {act.title}
                        </List.Item>
                    ))}
                </List> */}
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetail  />}
                {editMode &&
                <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})