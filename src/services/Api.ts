import axios from "axios";

export interface Failure {
  message: string;
}

export function isFailure(response: any | Failure): response is Failure {
  return "message" in response;
}

interface UserResult {
  id: number;
  login: string;
  avatar_url: string;
}

interface SearchUsersSuccessResponse {
  items: UserResult[];
}

export default abstract class Api {
  public static async getUsers(): Promise<UserResult[] | Failure> {
    try {
      var response = await axios.get<SearchUsersSuccessResponse>(`https://api.github.com/search/users?q=type:user`);
      return response.data.items;
    } catch (e) {
      return isFailure(e?.response?.data) ? e.response.data : { message: "Unknown error occured. Please try again." };
    }
  }
}
