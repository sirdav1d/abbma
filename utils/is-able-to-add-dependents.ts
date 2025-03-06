/** @format */

import { Ticket } from '@prisma/client';

export function howMuchIsAble(Dependentsquantity: number, activePlan: Ticket) {
	let dependentsAble = 0;
	if (activePlan.type == 'TELEMEDICINE_FAMILY' && activePlan.quantity) {
		dependentsAble =
			3 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
		if (Dependentsquantity >= dependentsAble) {
			return false;
		} else {
			return true;
		}
	} else if (activePlan.type == 'TELEMEDICINE_COUPLE' && activePlan.quantity) {
		dependentsAble =
			1 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
		if (Dependentsquantity >= dependentsAble) {
			return false;
		} else {
			return true;
		}
	} else if (activePlan.quantity) {
		dependentsAble = activePlan.quantity - 1;
		if (Dependentsquantity >= dependentsAble) {
			return false;
		} else {
			return true;
		}
	}

	return false;
}
