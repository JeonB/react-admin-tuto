import {
  Admin,
  Resource
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";

// dataProvider 속성
// 데이터 교환을 위한 내가 정의한 API에 react-admin을 연결해주는 어댑터
// 사용자의 액션을 백엔드 API가 이해하는 HTTP request로 변환
export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
  </Admin>
);
