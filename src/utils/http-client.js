import axios from 'axios'
let baseURL;
if (process.env.REACT_APP_ENV === 'production'){
  baseURL = "http://localhost:8080"
}else if (process.env.REACT_APP_ENV === 'staging'){
  baseURL = "http://localhost:8080"
}else{
  baseURL = 'http://localhost:8080'
}

export const cmsAPI = axios.create({
  //baseURL: "https://dr-nava-server.herokuapp.com/",
  baseURL:"http://localhost:8080",
  timeout: 10000,
  headers : {
    common:{}
  }
});

cmsAPI.addJwt = ((token) => {
  console.log("AddJwt", token)
  if(token)
    cmsAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`
})

cmsAPI.resolveAsset = ((url) => {
	return cmsAPI.defaults.baseURL + url
})

export const api = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers : {}
});
