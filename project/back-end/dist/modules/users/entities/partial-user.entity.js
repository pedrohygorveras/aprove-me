"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialUserEntity = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("./user.entity");
class PartialUserEntity extends (0, mapped_types_1.PartialType)(user_entity_1.UserEntity) {
}
exports.PartialUserEntity = PartialUserEntity;
//# sourceMappingURL=partial-user.entity.js.map