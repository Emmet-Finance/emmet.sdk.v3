"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEvmAddress = isValidEvmAddress;
exports.isValidTonAddress = isValidTonAddress;
const core_1 = require("@ton/core");
function isValidEvmAddress(tested) {
    const pattern = /^[0x]{0,2}[0-9a-fA-F]{0,40}$/;
    return pattern.test(tested);
}
function isValidTonAddress(tested) {
    try {
        core_1.Address.parse(tested);
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3ZlcmlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhDQUdDO0FBRUQsOENBT0c7QUFkSCxvQ0FBb0M7QUFFcEMsU0FBZ0IsaUJBQWlCLENBQUMsTUFBYztJQUM1QyxNQUFNLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztJQUMvQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLE1BQWM7SUFDNUMsSUFBSSxDQUFDO1FBQ0gsY0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQyJ9