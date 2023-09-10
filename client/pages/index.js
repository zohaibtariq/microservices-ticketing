import axios from "axios";
// export const LandingPage = ({currentUser}) => {
export const LandingPage = ({}) => {
    // console.log('I am in the component', color)
    return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async () => {
    // const response = await axios.post('/api/users/currentuser')
    // console.log('I am on server')
    // return response.data
    return {}
}

export default LandingPage