function Study() {
    let res = null;
    if (typeof window !== 'undefined') {
        res = localStorage.getItem("savedText");
    }
    return <pre>{JSON.stringify(res, null, 2)}</pre>
}

export default Study;
