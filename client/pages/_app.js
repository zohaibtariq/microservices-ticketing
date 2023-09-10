import "bootstrap/dist/css/bootstrap.css"
import buildClient from "../api/build-client";

const AppComponent = ({Component, pageProps}) => {
    return <div>
        <h1>HEADER {pageProps.currentUser.email}</h1>
        <Component {...pageProps}/>
        <h1>Footer</h1>
    </div>
}

// this is Custom App Component and context = {Component, ctx: {req, res}}
AppComponent.getInitialProps = async (appContext) => {
    console.log('App Component Props')
    const client = buildClient(appContext.ctx)
    const {data} = await client.get('/api/users/currentuser')
    let pageProps = {}
    if(appContext.Component.getInitialProps)
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    console.log(pageProps)
    return {
        pageProps,
        ...data
    }
}

export default AppComponent