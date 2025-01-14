
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const data = useLoaderData({});

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target 
        const name = form.name.value 
        const email = form.email.value 
        const upadeUser = {name,email};
        console.log(upadeUser);

        fetch(`http://localhost:5000/update/${data._id}`,{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(upadeUser)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        });

        
    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <h2>update</h2>
                <input type="text" name="name" defaultValue={data.name} /> <br />
                <input type="email" name='email' defaultValue={data.email} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Update;