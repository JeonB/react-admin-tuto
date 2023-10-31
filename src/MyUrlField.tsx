import { useRecordContext } from "react-admin";
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const MyUrlField = ({ source }: { source: string }) => {
    const record = useRecordContext();
    return record ? (
        <Link href={record[source]} sx={{ textDecoration: "none" }}>
            {record[source]}
            {/* sx는 React의 스타일 속성 */}
            <LaunchIcon sx={{ fontSize: 15, ml: 1 }} /> 
        </Link>
    ) : null;
    
};

export default MyUrlField;