import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";
import { PostEdit, PostList, PostCreate } from "./posts";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { QuickStart } from "./QuickStart";
// import { contents } from "@pages";
// dataProvider 속성
// 데이터 교환을 위한 내가 정의한 API에 react-admin을 연결해주는 어P댑터
// 사용자의 액션을 백엔드 API가 이해하는 HTTP request로 변환
export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
      icon={UserIcon}
    />
    <Resource name="services/obpcommon/api/sojeon" list={QuickStart} />
    {/* <Resource name="test/domain/value" {...contents} /> */}
  </Admin>
);
