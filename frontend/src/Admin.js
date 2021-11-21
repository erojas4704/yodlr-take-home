import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFromAPI } from "./actions/users";

export default function Admin() {
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersFromAPI())
    }, [dispatch]);

    return (
        <div>
            <h3 className="my-3">Admin Panel</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}