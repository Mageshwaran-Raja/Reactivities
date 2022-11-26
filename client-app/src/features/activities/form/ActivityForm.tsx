import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';

export default observer(function ActivityForm () {

    const navigate = useNavigate();
    const {activityStore} = useStore();
    const {loadActivity, createActivity, updateActivity, loading, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const[activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function onInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if(loadingInitial) return <LoadingComponent content='Loading Activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={onInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={onInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={onInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={onInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={onInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={onInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content='submit' />
                <Button as={Link} to='/activities' floated="right" type="button" content='cancel' />
            </Form>
        </Segment>
    )
})