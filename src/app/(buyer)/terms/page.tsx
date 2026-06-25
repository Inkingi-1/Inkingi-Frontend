import { InfoPageLayout, InfoSection } from "@/components/InfoPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | BuildConnect Rwanda",
  description: "Terms and conditions for using the BuildConnect construction marketplace.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="Last updated: June 2026 · By using BuildConnect you agree to these terms."
    >
      <InfoSection title="1. Acceptance">
        <p>
          These Terms govern your use of the BuildConnect platform (website, APIs, and related services) operated in
          Rwanda. If you do not agree, please do not use the service.
        </p>
      </InfoSection>

      <InfoSection title="2. Accounts & roles">
        <p>
          You must provide accurate registration information. Self-registration creates a <strong>customer</strong>{" "}
          account. Vendor, driver, and admin roles are assigned only by authorized administrators. You are responsible
          for keeping your login credentials secure.
        </p>
      </InfoSection>

      <InfoSection title="3. Marketplace transactions">
        <ul className="list-disc pl-5 space-y-1">
          <li>Product listings are provided by independent vendors; BuildConnect facilitates the connection.</li>
          <li>Prices, stock, and product descriptions are set by vendors and may change without notice.</li>
          <li>Orders are subject to availability and vendor confirmation.</li>
          <li>Payment is cash on delivery unless otherwise stated at checkout.</li>
        </ul>
      </InfoSection>

      <InfoSection title="4. Delivery">
        <p>
          Delivery times are estimates. BuildConnect and its driver partners are not liable for delays caused by weather,
          road conditions, or events beyond reasonable control. Inspect materials on delivery and report issues promptly
          through support.
        </p>
      </InfoSection>

      <InfoSection title="5. Acceptable use">
        <p>You agree not to misuse the platform, including fraudulent orders, harassment, scraping, or attempting to
          bypass role-based access controls.</p>
      </InfoSection>

      <InfoSection title="6. Limitation of liability">
        <p>
          To the fullest extent permitted by Rwandan law, BuildConnect is not liable for indirect damages arising from
          use of the platform. Our total liability for any claim is limited to the amount you paid for the relevant order
          in the preceding twelve months.
        </p>
      </InfoSection>

      <InfoSection title="7. Privacy">
        <p>
          Your use of BuildConnect is also governed by our{" "}
          <Link href="/privacy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </InfoSection>

      <InfoSection title="8. Changes & contact">
        <p>
          We may update these Terms from time to time. Continued use after changes constitutes acceptance. Contact{" "}
          <a href="mailto:legal@buildconnect.rw" className="text-primary font-semibold hover:underline">
            legal@buildconnect.rw
          </a>{" "}
          with questions.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
