"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBatchItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_batch_item_dto_1 = require("./create-batch-item.dto");
class UpdateBatchItemDto extends (0, swagger_1.PartialType)(create_batch_item_dto_1.CreateBatchItemDto) {
}
exports.UpdateBatchItemDto = UpdateBatchItemDto;
//# sourceMappingURL=update-batch-item.dto.js.map