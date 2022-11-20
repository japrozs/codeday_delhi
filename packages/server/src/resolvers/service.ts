import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from "type-graphql";
import { Service } from "../entities/Service";

export class ServiceResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Service)
    async createService(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Ctx() { req }: Context
    ) {
        if (name.trim().length == 0 || description.trim().length == 0) {
            return false;
        }
        return Service.create({
            name,
            description,
            creatorId: req.session.userId,
        }).save();
    }

    @Query(() => Service)
    async getService(@Arg("id", () => Int) id: number) {
        return Service.findOne({ where: { id }, relations: ["creator"] });
    }

    @Query(() => [Service])
    async getAllServices() {
        return Service.find({
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateService(
        @Arg("id", () => Int!) id: number,
        @Arg("description") description: string,
        @Ctx() { req }: Context
    ) {
        const note = await Service.findOne(id, { relations: ["creator"] });
        if (note?.creator.id != req.session.userId) {
            return false;
        }

        await Service.update(id, {
            description,
        });
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateServiceName(
        @Arg("id", () => Int!) id: number,
        @Arg("name") name: string,
        @Ctx() { req }: Context
    ) {
        const note = await Service.findOne(id, { relations: ["creator"] });
        if (note?.creator.id != req.session.userId) {
            return false;
        }

        await Service.update(id, {
            name,
        });
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteService(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: Context
    ) {
        const note = await Service.findOne(id, { relations: ["creator"] });
        if (note?.creator.id != req.session.userId) {
            return false;
        }
        await Service.delete({ id });
        return true;
    }
}
