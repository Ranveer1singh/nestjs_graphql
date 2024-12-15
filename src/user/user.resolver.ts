import { Resolver , Mutation , Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/dto/create.userInput';
import { LoginUserInput } from 'src/dto/login.userInput';
import { User } from './user.entity';


@Resolver(()=> User)
export class UserResolver {
    constructor (
        private UserService :UserService
    ) {}

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput : CreateUserInput ) :Promise<User>{
        const {email , password} = createUserInput;
        return this.UserService.createUser(email, password)
    }

    @Mutation(()=> String)
    async loginUser(@Args('loginUserInput') loginUserInput : LoginUserInput) : Promise<string>{
        const {email, password} = loginUserInput;
        const {token} = await this.UserService.loginUser(email, password);
        return token;
    }

    @Mutation(() => Boolean)
    async logoutUser(@Args('token') token: string): Promise<boolean> {
      return this.UserService.logoutUser(token);
    }
}
