export default `

    type User {
        _id: String!
        firstName: String!
        lastName: String!
        userType: Stryng!
        email: String!
        password: String!
        games: [Game]
    }

    type Query {
        user(_id: String!): User
        users: [User]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, userType: Stryng!, password: String!): User
        deleteUser(_id: String!): User
        editUser(_id: String!, username: String, email: String, password: String, games: [GameInput]): User
    }

`