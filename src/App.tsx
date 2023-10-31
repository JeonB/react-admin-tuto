import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";

// dataProvider 속성만 정의
export const App = () => <Admin dataProvider={dataProvider}></Admin>;
