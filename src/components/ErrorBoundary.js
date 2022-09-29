import errorImage from "../assets/commonImages/errorBoundary.png";


function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            {/* <p>Something went wrong:</p>
            <pre>{error.message}</pre> */}

            <h1>Something went wrong.</h1>

            <button onClick={resetErrorBoundary} style={{ height: "40px", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>Please try again</button>

            <img src={errorImage} style={{ width: "200px", height: "200px" }} />
        </div>
    )
}


export default ErrorFallback