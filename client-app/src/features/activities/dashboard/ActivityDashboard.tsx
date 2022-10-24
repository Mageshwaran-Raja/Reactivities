import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {
    activities: Activity[];
}

export default function ActivityDashboard ({activities}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    {activities.map(act => (
                        <List.Item key={act.id}>
                            {act.title}
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}