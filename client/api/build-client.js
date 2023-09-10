import axios from 'axios'

export default ({req}) => {
    let config = { // browser config
        baseURL: '/',
    }
    if(typeof window === 'undefined'){ // server config
        config = {
            // SERVICENAME.NAMESPACENAME
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        }
    }
    // console.log('build client')
    // console.log(config)
    return axios.create(config)
}