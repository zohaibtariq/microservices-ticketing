import axios from 'axios'
import {useState} from "react";

export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        setErrors(null)
        await axios[method](url, body).then((response) => {
            if(onSuccess)
                onSuccess(response.data)
            response.data
        }).catch((e) => {
            // console.log(e)
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops</h4>
                    <ul className="my-0">
                        {e.response.data.errors.map((error) => <li key={error.message}>{error.message}</li>)}
                    </ul>
                </div>
            )
        })
    }
    return {doRequest, errors}
}