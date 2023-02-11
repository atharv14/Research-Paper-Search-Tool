import { Container, Row } from "react-bootstrap";
import PreferencesCard from "../components/PreferencesCard";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
    return (
        <Container className="profile-page">
            <ProfileCard />
            <PreferencesCard />
        </Container>
    );
};

export default Profile;
