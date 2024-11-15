"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_payable_dto_1 = require("./create-payable.dto");
class UpdatePayableDto extends (0, swagger_1.PartialType)(create_payable_dto_1.CreatePayableDto) {
}
exports.UpdatePayableDto = UpdatePayableDto;
//# sourceMappingURL=update-payable.dto.js.map