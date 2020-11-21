import axios from "axios";
import parse from "parse-link-header";

export interface Failure {
  message: string;
}

export function isFailure(response: any | Failure): response is Failure {
  return response && "message" in response;
}

function toFailure(e: any) {
  return isFailure(e?.response?.data) ? e.response.data : { message: "Unknown error occured. Please try again." };
}

interface UserResult {
  id: number;
  login: string;
  avatar_url: string;
}

interface Page {
  page: number;
  url: string;
}

interface Pages {
  next?: Page;
  prev?: Page;
  last?: Page;
}

interface SearchUsersResult {
  users: UserResult[];
  pages: Pages;
}

interface SearchUsersSuccessResponse {
  items: UserResult[];
}

interface UserDetailsResult extends UserResult {
  name: string;
  email: string;
  location: string;
}

export default abstract class Api {
  public static async getUsers(page: number, pageSize: number): Promise<SearchUsersResult | Failure> {
    try {
      const url = `https://api.github.com/search/users?q=type:user&page=${page}&per_page=${pageSize}`;
      const response = await axios.get<SearchUsersSuccessResponse>(url);
      const users = response.data.items;
      const links = parse(response.headers["link"]);
      if (!links)
        return {
          users,
          pages: {
            last: { page: 1, url },
          },
        };
      const next = links["next"];
      const prev = links["prev"];
      const last = links["last"];
      return {
        users,
        pages: {
          next: next ? { url: next.url, page: parseInt(next["page"]) } : undefined,
          prev: prev ? { url: prev.url, page: parseInt(prev["page"]) } : undefined,
          last: last ? { url: last.url, page: parseInt(last["page"]) } : undefined,
        },
      };
    } catch (e) {
      return toFailure(e);
    }
  }

  public static async getUser(login: string): Promise<UserDetailsResult | Failure> {
    try {
      return (await axios.get<UserDetailsResult>(`https://api.github.com/users/${login}`)).data;
    } catch (e) {
      return toFailure(e);
    }
  }
}
