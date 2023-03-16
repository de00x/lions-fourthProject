interface IOwner {
  login: string;
  id: number;
  avatar_url: string;
}
interface IFindRepository {
  name: string;
  full_name: string;
  description: string;
  owner: IOwner;
  html_url: string;
}

export type { IFindRepository };
