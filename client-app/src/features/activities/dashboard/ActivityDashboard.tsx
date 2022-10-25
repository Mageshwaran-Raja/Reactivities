import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelselectActivity : () => void;

    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;

    createOredit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard ({activities, selectedActivity, deleteActivity,
    selectActivity, cancelselectActivity, editMode, openForm, closeForm, createOredit}: Props) {
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
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetail 
                    activity={selectedActivity} 
                    cancelselectActivity={cancelselectActivity} 
                    openForm={openForm}
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOredit={createOredit}/>}
            </Grid.Column>
        </Grid>
    )
}