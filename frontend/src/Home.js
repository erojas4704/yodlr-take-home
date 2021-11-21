import { useSelector } from "react-redux";

export default function Home() {
    const currentUser = useSelector(state => state.user.currentUser);
    return (
        <div className="mt-3">
            <div className="display-5 my-3">yodlr</div>
            <p>Welcome to yodlr.</p>
            <p>We have content. We have all of the content. Why would you ever need another site?</p>
            <p>The other sites don't have content.</p>

            {currentUser && <p>Welcome back, {currentUser.firstName}</p>}
        </div>
    )
}