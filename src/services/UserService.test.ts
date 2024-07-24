import { User, UserService } from "./UserService"

describe('UserService', () =>{
    const mockDb: User[] = []
    const userService = new UserService(mockDb); //Inicializando a classe.

    it ('Deve adicionar um novo usuário', () =>{
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('Kaynan', 'Kaynanfelipe28@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
    })
})