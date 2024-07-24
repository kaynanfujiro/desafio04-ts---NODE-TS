import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { makeMockResponse } from "./__mocks__/mockResponse.mock";
import { Request } from "express";

describe ('UserController', () =>{
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn(),
    }

    const {createUser, getAllUsers, deleteUser} = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const MockRequest = {
            body: {
                name: 'Kaynan',
                email: 'Kaynanfelipe@test.com'
            }
        } as Request

        const MockResponse = makeMockResponse()
        createUser(MockRequest, MockResponse)
        expect(MockResponse.state.status).toBe(201)
        expect(MockResponse.state.json).toMatchObject({ message: 'Usuário Criado'})
    })
    it('Deve acusar um erro quando o nome do usuário estiver vazio', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'Kaynanfelipe@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })
    it('Deve acusar um erro quando o email do usuário estiver incorreto', () => {
        const mockRequest = {
            body: {
                name: 'Kaynan',
                email: 'Kaynanfelipe@test'
            }
        } as Request
        const mockResponse = makeMockResponse()
        createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' })
    })

    it('Deve listar todos os usuários', () => {
        const mockRequest = {
            body: {
                name: 'Kaynan',
                email: 'Kaynanfelipe@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve deletar o usuário', () => {
        const mockRequestC = {
            body: {
                name: 'Kaynan',
                email: 'Kaynanfelipe@test.com'
            }
        } as Request
        const mockResponseC = makeMockResponse()
        createUser(mockRequestC, mockResponseC)

        const mockRequest = {
            body: {
                name: 'Kaynan'
            }
        }as Request

        const mockResponse = makeMockResponse()
        deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário Deletado'})

    })
})