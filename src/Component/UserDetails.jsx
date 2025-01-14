
import { useLoaderData } from 'react-router-dom';

const UserDetails = () => {
    const data = useLoaderData({});
    return (
        <div>
            <h2>Details</h2>
            name : {data.name} <br />
            email : {data.email}
        </div>
    );
};

export default UserDetails;