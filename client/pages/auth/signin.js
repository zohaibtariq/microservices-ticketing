import {useState} from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password},
        onSuccess: (response) => Router.push('/')
    })
    const onsubmit = async (e) => {
        e.preventDefault()
        doRequest()
    }
    return <form action="" onSubmit={onsubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" type="text"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password"/>
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
    </form>
}