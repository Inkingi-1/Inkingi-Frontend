import { InfoPageLayout, InfoSection } from "@/components/InfoPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | BuildConnect Rwanda",
  description: "How BuildConnect uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <InfoPageLayout title="Cookie Policy" subtitle="Last updated: June 2026">
      <InfoSection title="What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the site remember your
          preferences and keep you signed in.
        </p>
      </InfoSection>

      <InfoSection title="Cookies we use">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Essential</strong> — authentication tokens, cart session, and security (required for the site to
            work).
          </li>
          <li>
            <strong>Functional</strong> — remembered preferences such as notification settings.
          </li>
          <li>
            <strong>Analytics</strong> — anonymous usage data to improve performance (where enabled).
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Managing cookies">
        <p>
          You can clear cookies through your browser settings. Disabling essential cookies may prevent you from logging
          in or completing orders.
        </p>
      </InfoSection>

      <InfoSection title="More information">
        <p>
          See our{" "}
          <Link href="/privacy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            contact us
          </Link>
          .
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
