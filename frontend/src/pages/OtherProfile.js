import { useParams } from "react-router-dom";
import Profile from "../components/Profile.js";

export default function OtherProfile() {
    const { id } = useParams();

    return <Profile id={id}/>;
}
