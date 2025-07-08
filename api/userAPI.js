import { getData} from "./API.js";

const ENDPOINT = "users";

const getUsers = async () => {
    try {
        const users = await getData(ENDPOINT);
        console.log("here in api", users);
        return { status: true, data: users };
    } catch (error) {
        return { status: false, message: error };
    }
}

export { getUsers };