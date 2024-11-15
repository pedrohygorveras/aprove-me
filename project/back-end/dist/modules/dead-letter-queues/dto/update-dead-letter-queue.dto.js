"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeadLetterQueueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_dead_letter_queue_dto_1 = require("./create-dead-letter-queue.dto");
class UpdateDeadLetterQueueDto extends (0, swagger_1.PartialType)(create_dead_letter_queue_dto_1.CreateDeadLetterQueueDto) {
}
exports.UpdateDeadLetterQueueDto = UpdateDeadLetterQueueDto;
//# sourceMappingURL=update-dead-letter-queue.dto.js.map