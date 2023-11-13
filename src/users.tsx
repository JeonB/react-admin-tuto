import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";
// import MyUrlField from "./MyUrlField";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    // <List>컴포넌트는 URL로부터 query파라미터를 읽고 이를 기반으로 API를 호출하며 React Context에 결과를 삽입
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
          {/* <TextField source="username" /> */}
          <EmailField source="email" />
          {/* <TextField source="address.street" /> */}
          <TextField source="phone" />
          {/* <MyUrlField source="website" /> */}
          <TextField source="company.name" />
        </Datagrid>
      )}
    </List>
  );
};
