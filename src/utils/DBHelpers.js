import axios from "axios";

export const sendStateToDB = async state => {
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/world',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        },
        data: {
            state
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

export const recieveDataFromDB = async () => {
    await axios.get('http://localhost:5000/api/hello')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return undefined;
        });
};
