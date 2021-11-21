import LoadingSpinner from "./LoadingSpinner";

export default function APIFeedback({ loading, error }) {
    return (
        <div className="d-flex my-3">
            {loading && <LoadingSpinner className="h3 m-3" />}
            {error && <p className="text-danger mx-3">{error}</p>}
        </div>
    )
}