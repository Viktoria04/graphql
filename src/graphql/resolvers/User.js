import User from "../../models/User";
import bcrypt from "bcrypt";



export default {
    Query: {
        user: (root, args) => {
            return new Promise((resolve, reject) => {
                User.findOne(args).exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        },
        users: () => {
            return new Promise((resolve, reject) => {
                User.find({}).populate().exec((error, response) => {
                    error ? reject(error) : resolve(response);
                })
            })
        }
    },
    Mutation: {
        addUser: async (root, { firstName, lastName, email, userType, password }) => {
            // 
            const newUser = await new User({
                firstName,
                lastName,
                email,
                userType,
                password: await bcrypt.hash(password, 10)
            });
            if (!newUser) {
                throw new Error('Cannot create user ${email}')
            }
            let saveUser = null;
            try {
                saveUser = await newUser.save();
            } catch (e) {
                console.log('something went wrong');
            }

            return jsonwebtoken.sign(
                {
                    _id: newUser._id,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 'id'
                });
        }
    },
    login: async (root, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Cannot find user with email: ${email}')
        }

        const valid = await bcrypt.compare(password, user.password);
    }
    return jsonwebtoken.sign(
        {
            _id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
        expiresIn: 'id'
        }
    }
}

deleteUser: (root, { _id }) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove({ _id }).exec((error, response) => {
            error ? reject(error) : resolve(response);
        })
    })
},
    editUser: async (root, { _id, username, email, password, games }) => {
        const response = await User.findByIdAndUpdate({ _id }, { $set: { username, email, password, games } }, { new: true }).exec();
        if (!response) {
            throw new Error(`Cannot save user: ${_id}`);
        }
        return response;
    }
}
}