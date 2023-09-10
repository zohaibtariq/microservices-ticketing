import buildClient from "../api/build-client"
import Router from "next/router"
import useRequest from "../hooks/use-request";

export const LandingPage = ({currentUser}) => {

    const {doRequest} = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: (response) => Router.push('/')
    })

    const signOut = () => {
        // test1@test.test
        doRequest()
    }

    return currentUser ? <div>
        <h1>You are signed in as {currentUser.email}</h1>
        <button className="btn btn-danger" onClick={signOut}>Sign Out</button>
    </div> : <div>
        <h1>You are not signed in</h1>
        <button className="btn btn-primary" onClick={(e) => Router.push('/auth/signin')}>Sign In</button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={(e) => Router.push('/auth/signup')}>Sign Up</button>
    </div>
}

// this is a Page Component and context = {req, res}
LandingPage.getInitialProps = async (context) => {
    console.log('Page Props')
    const client = buildClient(context)
    const {data} = await client.get('/api/users/currentuser')
    return data
}

export default LandingPage