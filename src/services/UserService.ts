export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Renan",
        email: "Renan@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){ 
        this.db = database
    }

    createUser = (name: string, email:string) => {
        const user: User = {
            name,
            email,
        }

        this.db.push(user)
        console.log('DB Atualizado',this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (name: string) => {
        this.db = this.db.filter(user => user.name !== name)
    }
}