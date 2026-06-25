import { InfoPageLayout, InfoSection } from "@/components/InfoPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | BuildConnect Rwanda",
  description: "How BuildConnect collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      subtitle="Last updated: June 2026 · BuildConnect Rwanda Ltd."
    >
      <InfoSection title="1. Information we collect">
        <p>We collect information you provide when you register, place orders, or contact support, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name, email address, and phone number</li>
          <li>Delivery and billing addresses</li>
          <li>Order history and payment method preferences (COD)</li>
          <li>Messages sent through our contact form or support channels</li>
        </ul>
        <p>We also collect technical data such as device type, browser, and IP address for security and analytics.</p>
      </InfoSection>

      <InfoSection title="2. How we use your information">
        <ul className="list-disc pl-5 space-y-1">
          <li>Process and deliver your material orders</li>
          <li>Assign vendor and driver roles as approved by administrators</li>
          <li>Send order updates and service notifications</li>
          <li>Improve platform performance and prevent fraud</li>
          <li>Comply with applicable Rwandan law and regulations</li>
        </ul>
      </InfoSection>

      <InfoSection title="3. Sharing of data">
        <p>
          We share necessary order details with vendors fulfilling your purchase and drivers assigned to your delivery.
          We do not sell your personal data to third parties. Service providers (hosting, email) may process data on our
          behalf under strict confidentiality agreements.
        </p>
      </InfoSection>

      <InfoSection title="4. Data retention & security">
        <p>
          We retain account and order records as required for business and legal purposes. We use encryption, access
          controls, and secure authentication to protect your information.
        </p>
      </InfoSection>

      <InfoSection title="5. Your rights">
        <p>
          You may request access, correction, or deletion of your personal data by contacting{" "}
          <a href="mailto:privacy@buildconnect.rw" className="text-primary font-semibold hover:underline">
            privacy@buildconnect.rw
          </a>
          . You may also close your account through support.
        </p>
      </InfoSection>

      <InfoSection title="6. Cookies">
        <p>
          We use essential cookies for login sessions and preferences. See our{" "}
          <Link href="/cookies" className="text-primary font-semibold hover:underline">
            Cookie policy
          </Link>{" "}
          for details.
        </p>
      </InfoSection>

      <InfoSection title="7. Contact">
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:privacy@buildconnect.rw" className="text-primary font-semibold hover:underline">
            privacy@buildconnect.rw
          </a>{" "}
          or visit{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Contact us
          </Link>
          .
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
