interface loginType {
    status?: string;
    username?: string;
    follow?:string[]
    TODO?: todoType[];
    DONE?: todoType[]
}

interface todoType {
    todo: string;
    id: string
}

export default loginType;