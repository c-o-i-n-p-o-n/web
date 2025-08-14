import { UserDataSource } from "../data/user.data-source";
import { User } from "../models/User";
import UserCreation from "../models/UserCreation";
import { IUserService } from "../types/UserServiceType";

export class UserService implements IUserService {

    private userDataSource: UserDataSource = new UserDataSource();

    public async createUser(user: UserCreation): Promise<User> {
        return this.userDataSource.createUser(user);
    };

    public async getUserById(id: number): Promise<User>{
        return this.userDataSource.getUserById(id);
    }

    public async getUser(): Promise<User>{
        return this.userDataSource.getUser();
    }

    public async updateUser(user: UserCreation): Promise<User> {
        return this.userDataSource.updateUser(user);
    }

    updatePassword(userId: number, actualCryptedPass: string, newCryptedPass: string): void {
        this.userDataSource.updatePassword({actualCryptedPass, newCryptedPass}, userId).catch(console.log);
    }

    deleteUserGroupById(userId: number, groupingId: number): any {
    }

    getGroupsByUserId(userId: number): any {
    }

    updateUserGroupById(userId: number, groupingId: number): any {
    }

}
