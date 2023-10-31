import { List,SimpleList } from "react-admin";

export const UserList = () => (
    // <List>컴포넌트는 URL로부터 query파라미터를 읽고 이를 기반으로 API를 호출하며 React Context에 결과를 삽입
    <List>
        
        {/* <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid> */}
        <SimpleList
            primaryText={(record) => record.name}
            secondaryText={(record) => record.username}
            tertiaryText={(record) => record.email}
        />
    </List>
);