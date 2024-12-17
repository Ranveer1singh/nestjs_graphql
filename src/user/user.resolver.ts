import { Resolver ,Query, Mutation , Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/dto/create.userInput';
import { LoginUserInput } from 'src/dto/login.userInput';
import { User } from './user.entity';


@Resolver(()=> User)
export class UserResolver {
    constructor (
        private userService :UserService
    ) {}

    @Query(() => String) // Add a root Query to avoid schema errors
  hello(): string {
    return 'Hello, World!';
  }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
      const { email, password } = createUserInput;
      return this.userService.createUser(email, password);
    }

    @Mutation(()=> String)
    async loginUser(@Args('loginUserInput') loginUserInput : LoginUserInput) : Promise<string>{
        const {email, password} = loginUserInput;
        const {token} = await this.userService.loginUser(email, password);
        return token;
    }

    @Mutation(() => Boolean)
    async logoutUser(@Args('token') token: string): Promise<boolean> {
      return this.userService.logoutUser(token);
    }
}
