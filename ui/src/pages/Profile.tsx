import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUser } from "../api/user";
import { userType } from "../api/types";
import PreferencesCard from "../components/PreferencesCard";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
    const [user, setUser] = useState<userType>();
    useEffect(() => {
        const userData = getUser();
        setUser(userData);
    }, []);

    return (
        <Container className="profile-page">
            {user && <ProfileCard user={user} />}
            <PreferencesCard />
        </Container>
    );
};

export default Profile;
