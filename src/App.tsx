import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";

// dataProvider 속성만 정의
// 데이터 교환을 위한 내가 정의한 API에 react-admin을 연결해주는 어댑터
export const App = () => <Admin dataProvider={dataProvider}></Admin>;
