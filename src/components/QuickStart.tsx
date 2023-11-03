import React from "react";
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const QuickStart = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" link="show" />
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
);
