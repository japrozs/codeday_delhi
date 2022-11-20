import {
    Resolver,
    Mutation,
    Arg,
    Field,
    Ctx,
    ObjectType,
    Query,
    UseMiddleware,
    Int,
} from "type-graphql";
import { Context } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UserInput } from "../schemas/UserInput";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: Context) {
        // you are not logged in
        console.log(req.cookies);
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId, {
            relations: ["services"],
        });
    }

    @Query(() => User)
    async getUser(@Arg("id", () => Int) id: number) {
        return User.findOne({ where: { id }, relations: ["services"] });
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UserInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    name: options.name,
                    email: options.email,
                    password: hashedPassword,
                    phone: options.password,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            // duplicate username error
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email already taken",
                        },
                    ],
                };
            }
        }

        req.session.userId = user.id;
        const us = await User.findOne(user.id, {});

        return { user: us };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "that account doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;
        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateName(@Arg("name") name: string, @Ctx() { req }: Context) {
        await User.update(
            { id: req.session.userId },
            {
                name,
            }
        );
        return true;
    }
}
