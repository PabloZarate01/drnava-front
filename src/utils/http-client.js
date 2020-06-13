import axios from 'axios'
let baseURL;
if (process.env.REACT_APP_ENV === 'production'){
  baseURL = "https://dr-nava-server.herokuapp.com"
}else{
  baseURL = 'http://localhost:8080'
}

export const cmsAPI = axios.create({
  //baseURL: "https://dr-nava-server.herokuapp.com/",
  baseURL,
  timeout: 16000,
  headers : {
    common:{

    }
  }
});
cmsAPI.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("userJWT")}`

cmsAPI.addJwt = ((token) => {
  console.log("AddJwt", token)
  if(token)
  cmsAPI.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("userJWT")}`
})

cmsAPI.resolveAsset = ((url) => {
	return cmsAPI.defaults.baseURL + url
})

export const api = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers : {}
});
