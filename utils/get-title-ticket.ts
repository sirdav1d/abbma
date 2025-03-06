/** @format */

import { $Enums } from '@prisma/client';

export function getTitle(type: $Enums.TicketType) {
	if (type == 'CLUB_VANTAGES') {
		return 'Clube de Vantagens';
	}

	if (type == 'TELEMEDICINE_INDIVIDUAL') {
		return 'Telemedicina Individual';
	}

	if (type == 'TELEMEDICINE_COUPLE') {
		return 'Telemedicina Casal';
	}
	if (type == 'TELEMEDICINE_FAMILY') {
		return 'Telemedicina Família';
	}
}
