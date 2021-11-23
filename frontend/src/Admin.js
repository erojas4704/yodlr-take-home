import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFromAPI } from "./actions/users";
import APIFeedback from "./APIFeedback";

export default function Admin() {
    const userData = useSelector(state => state.user.users);
    const dispatch = useDispatch();

    //userData.loading, userData.data, userData.error
    let usersArr = Object.values(userData.data || {});

    useEffect(() => {
        dispatch(getAllUsersFromAPI())
    }, [dispatch]);

    return (
        <div>
            <APIFeedback loading={userData.loading} error={userData.error} />

            {!userData.error && <><h3 className="my-3">Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArr && usersArr.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td className={user.state === "pending"? "text-warning" : "text-success"}>{user.state}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> </>}
        </div>
    )
}