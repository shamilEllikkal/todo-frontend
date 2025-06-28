import axios  from "axios";

const axiosIntanse = axios.create({
    baseURL:"http://localhost:5000/api",
});

axiosIntanse.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization =` Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
);

axiosIntanse.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response?.status===401){
            console.warn("Unautharized , redicting to login....");
            localStorage.removeItem("token");
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
);

export default axiosIntanse