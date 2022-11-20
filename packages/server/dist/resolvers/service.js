"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResolver = void 0;
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const Service_1 = require("../entities/Service");
class ServiceResolver {
    async createService(name, description, { req }) {
        if (name.trim().length == 0 || description.trim().length == 0) {
            return false;
        }
        return Service_1.Service.create({
            name,
            description,
            creatorId: req.session.userId,
        }).save();
    }
    async getService(id) {
        return Service_1.Service.findOne({ where: { id }, relations: ["creator"] });
    }
    async getAllServices() {
        return Service_1.Service.find({
            relations: ["creator"],
            order: { createdAt: "DESC" },
        });
    }
    async updateService(id, description, { req }) {
        const note = await Service_1.Service.findOne(id, { relations: ["creator"] });
        if ((note === null || note === void 0 ? void 0 : note.creator.id) != req.session.userId) {
            return false;
        }
        await Service_1.Service.update(id, {
            description,
        });
        return true;
    }
    async updateServiceName(id, name, { req }) {
        const note = await Service_1.Service.findOne(id, { relations: ["creator"] });
        if ((note === null || note === void 0 ? void 0 : note.creator.id) != req.session.userId) {
            return false;
        }
        await Service_1.Service.update(id, {
            name,
        });
        return true;
    }
    async deleteService(id, { req }) {
        const note = await Service_1.Service.findOne(id, { relations: ["creator"] });
        if ((note === null || note === void 0 ? void 0 : note.creator.id) != req.session.userId) {
            return false;
        }
        await Service_1.Service.delete({ id });
        return true;
    }
}
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Service_1.Service),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("description")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "createService", null);
__decorate([
    (0, type_graphql_1.Query)(() => Service_1.Service),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "getService", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Service_1.Service]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "getAllServices", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("description")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "updateService", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "updateServiceName", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "deleteService", null);
exports.ServiceResolver = ServiceResolver;
//# sourceMappingURL=service.js.map