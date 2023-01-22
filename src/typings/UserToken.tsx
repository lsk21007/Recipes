interface loginType {
    status?: string;
    email?: string;
    follow?:string[]
    TODO?: todoType[];
    DONE?: todoType[]
}

interface todoType {
    todo: string;
    id: string
}

export default loginType;