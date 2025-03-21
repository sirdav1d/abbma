/** @format */

import { Ticket } from '@prisma/client';

export function howMuchIsAble(Dependentsquantity: number, activePlan: Ticket) {
	if (!activePlan || !activePlan.quantity) {
		return false;
	}
	let dependentsAble = 0;

	switch (activePlan.type) {
		case 'TELEMEDICINE_FAMILY':
			dependentsAble =
				3 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
			if (Dependentsquantity >= dependentsAble) {
				return false;
			} else {
				return true;
			}
		case 'TELEMEDICINE_COUPLE':
			dependentsAble =
				1 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
			if (Dependentsquantity >= dependentsAble) {
				return false;
			} else {
				return true;
			}

		default:
			if (activePlan.quantity) {
				dependentsAble = activePlan.quantity - 1;
				if (Dependentsquantity >= dependentsAble) {
					return false;
				} else {
					return true;
				}
			}
			break;
	}
}
