const axios = require("axios");
let user = {};

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
   });


async function getData(userID){

    const response1  = await api.get(`/users/${userID}`)
                    .then(response=>{
                        return response.data;
                    }).catch(error=>{
                        console.log("message",error);
                    });

    const response2 = await api.get(`/posts?userId=${userID}`)
                    .then(response=>{
                        response.data.forEach((val)=>{
                            delete val.userId;
                        })
                        return response.data;
                    }).catch(error=>{
                        console.log("message",error);
                    });

    const response3 = await api.get(`/posts/${userID}/comments`)
                    .then(response=>{
                        response.data.forEach((val)=>{
                            delete val.postId;
                        })
                        return response.data;
                    }).catch(error=>{
                        console.log("message",error);
                    });

    user.info = await response1;
    user.post = await response2;
    user.comment = await response3;

    console.log(user);
}

getData(6);
 

