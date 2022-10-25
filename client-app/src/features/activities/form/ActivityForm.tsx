import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;

    createOredit: (activity: Activity) => void;
}

export default function ActivityForm ({activity: selectedActivity, closeForm, createOredit} : Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const[activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOredit(activity);
    }

    function onInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
        
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={onInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={onInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={onInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={onInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={onInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={onInputChange}/>
                <Button floated="right" positive type="submit" content='submit' />
                <Button onClick={()=>closeForm()} floated="right" type="button" content='cancel' />
            </Form>
        </Segment>
    )
}