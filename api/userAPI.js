import { getData} from "./API.js";

const ENDPOINT = "users";

const getUsers = async () => {
    try {
        const users = await getData(ENDPOINT);

        return { status: true, data: users };
    } catch (error) {
        return { status: false, message: error };
    }
}

export { getUsers };