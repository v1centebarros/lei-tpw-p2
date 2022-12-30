export class CustomUser{
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public date_birth: string,
        public admin: boolean = false,
    ){
    }

}