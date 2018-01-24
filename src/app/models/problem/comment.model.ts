import { Problem } from './problem.model';
import { User } from './../user/user.model';
export class Comment {

    message: string;
    date: string;
    creator: User;
    problem: Problem;

}
