import Button from 'react-bootstrap/Button';

export default function Home() {
    return (<>
        <p>
            <a href="/signup">Registration Page</a><br />
            <a href="/admin">Admin Page</a>
            <Button>Do it</Button>
        </p>
    </>
    )
}