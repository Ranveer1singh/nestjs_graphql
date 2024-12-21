import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "./user.entity";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){}

    async createUser(email : string, password : string) : Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({email, password : hashedPassword});
        return this.userRepository.save(user);

    }

    async loginUser(email : string, password : string) : Promise<{token : string}>{
        const user = await this.userRepository.findOneBy({email});
        if(!user){
            throw new UnauthorizedException('Invalid credential')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            throw new UnauthorizedException('Invaild credential')
        }

        const token = jwt.sign(
            {id: user.id, email:user.email} ,
            "secretkey", 
            {expiresIn : '1h'}

        );
        return  { token };
    }

        async logoutUser(token : string) : Promise<boolean>{
            return true;
        }
}
