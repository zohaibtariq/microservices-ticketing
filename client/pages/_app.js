import "bootstrap/dist/css/bootstrap.css"

export default({Component, pageProps}) => {
    return <div>
        <h1>HEADER</h1>
        <Component {...pageProps}/>
        <h1>Footer</h1>
    </div>
}