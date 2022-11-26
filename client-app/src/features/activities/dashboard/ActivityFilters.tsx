import { Header, Menu } from "semantic-ui-react";
import Calendar from 'react-calendar';

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
                <Header icon='filter' attached color="teal" content='Filters' />
                <Menu.Item content='All Activities'/>
                <Menu.Item content='Im Going'/>
                <Menu.Item content='Im Hosting'/>
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}