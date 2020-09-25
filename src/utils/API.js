const API = {
    login:function(userData){
        console.log(userData)
        return fetch("http://localhost:8080/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(userData)
        }).then(res=> res.json()).catch(err=>null)
    },
    getUserFromToken:function(token){
        return fetch("http://localhost:8080/userFromToken",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({token:token})
        }).then(res=> res.json()).catch(err=>null)
    },
    getTurtles: function(token,userId){
        console.log('fetching turtles')
        return fetch(`http://localhost:8080/users/${userId}/turtles`,{
            headers:{
                "authorization": `Bearer ${token}`
            }
        }).then(res=>res.json()).catch(err=>null);
    }
}

export default API;