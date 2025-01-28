/** @format */

import SendInvoiceLinkAction from "@/actions/email/invoice-link";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

export async function sendInvoiceIfAvailable(
	session: Stripe.Checkout.Session,
	email: string,
	name: string,
) {
	const invoiceId = session.invoice as string;

	if (invoiceId) {
		const invoice = await stripe.invoices.retrieve(invoiceId);

		if (invoice.hosted_invoice_url) {
			await SendInvoiceLinkAction({
				email,
				link: invoice.hosted_invoice_url,
				name,
			});
			console.log('Invoice sent');
		}
	}
}
