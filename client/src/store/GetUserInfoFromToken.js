import jwt_decode from "jwt-decode";


const GetUserInfoFromToken = () => {
        
    const token = localStorage.getItem('token');


    const decodedToken = jwt_decode(token);


    const userId = decodedToken.id;

    return (userId);
};

export default GetUserInfoFromToken;