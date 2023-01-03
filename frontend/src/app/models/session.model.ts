export class Session{

    constructor(
        public token: string,
        public username: string,
        public _user_id: number
    ){}


    static getCurrentSession() : Session | null{

        let storedUser = localStorage.getItem('user');

        if (storedUser !== undefined && storedUser !== null) {

            let currentSessionJsonObj = JSON.parse(storedUser);
            return new Session(currentSessionJsonObj['Authorization'], currentSessionJsonObj['username'], currentSessionJsonObj['user_id']);

        }

        return null;

    }

    // get e set

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public get_user_id(): number {
        return this._user_id;
    }


    public set_user_id(_user_id: number): void {
        this._user_id = _user_id;
    }
    

}