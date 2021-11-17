export default function SignUp() {
    return (<>
        <h1>Yodlr Registration Portal</h1>
        <form>
            Email: <input type="email" name="email" /><br />
            <button type="submit">Submit</button>
        </form>
        <p>
            <a href="/admin.html">Admin Page</a>
        </p>
    </ >
    );
}