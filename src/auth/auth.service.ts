import { compareSync } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
      ) {}

    
    async login(user){
        const payload = {id: user.id, nome: user.nome, email: user.email}

        return {
            sucesso: true,
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(login: string, password: string){
        let user: User[];
        let userLogged: User;
        try {
            user = await this.userRepository.find({login});
            
        } catch (error) {
            return null;
        }
        let acceptLogin = false;
        if (user.length > 0){
            user.forEach(x => {
                const isPasswordValid = compareSync(password, x.password);
                if (isPasswordValid) {
                    acceptLogin = true;
                    userLogged = x;
                }
            });
        }
        if (!acceptLogin) return null;

        return userLogged;
    }
}