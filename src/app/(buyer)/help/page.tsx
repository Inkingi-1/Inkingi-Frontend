import { InfoPageLayout, InfoSection } from "@/components/InfoPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Help Center | BuildConnect Rwanda",
  description: "Get help with orders, deliveries, vendor accounts, and payments on BuildConnect.",
};

export default function HelpCenterPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      subtitle="Answers to common questions about shopping, selling, and deliveries on BuildConnect."
    >
      <InfoSection title="Getting started">
        <p>
          BuildConnect connects construction buyers, material vendors, and delivery drivers across Rwanda.
          Create an account, browse the marketplace, add items to your cart, and checkout with cash on delivery.
        </p>
        <p>
          New vendor or driver accounts are assigned by an administrator after registration as a customer.
        </p>
      </InfoSection>

      <InfoSection title="Orders & tracking">
        <p>
          After placing an order, track status anytime from{" "}
          <Link href="/orders/track" className="text-primary font-semibold hover:underline">
            My orders
          </Link>
          . Status updates include assigned, on the way, and delivered.
        </p>
      </InfoSection>

      <InfoSection title="Payments">
        <p>
          We currently support <strong>cash on delivery (COD)</strong> only. Pay the driver when your materials
          arrive at the site.
        </p>
      </InfoSection>

      <InfoSection title="Vendor & driver portals">
        <ul className="list-disc pl-5 space-y-2">
          <li>Vendors manage inventory, storefront, and sales analytics from the vendor dashboard.</li>
          <li>Drivers update delivery status from the carrier dispatch dashboard.</li>
          <li>Role access is assigned by your organization admin — you cannot switch portals yourself.</li>
        </ul>
      </InfoSection>

      <InfoSection title="Still need help?">
        <p>
          Visit our{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Contact us
          </Link>{" "}
          page or email{" "}
          <a href="mailto:support@buildconnect.rw" className="text-primary font-semibold hover:underline">
            support@buildconnect.rw
          </a>
          .
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
