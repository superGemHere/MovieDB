import Link from "next/link"
import styles from "./page.module.css"

export default function TermsOfServicePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last Updated: March 1, 2023</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using MovieDB ("the Service"), you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
              using or accessing the Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on MovieDB's website for personal,
              non-commercial use only. This is the grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on MovieDB's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated
              by MovieDB at any time.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you guarantee that the information you provide is accurate, complete,
              and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate
              termination of your account on the Service.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and password, including but not
              limited to restricting access to your computer and/or account. You agree to accept responsibility for all
              activities that occur under your account or password.
            </p>
            <p>
              You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your
              account.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material. You are responsible for the content that you post to the Service,
              including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly
              display, reproduce, and distribute such content on and through the Service. You retain any and all of your
              rights to any content you submit, post, or display on or through the Service and you are responsible for
              protecting those rights.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Prohibited Uses</h2>
            <p>
              You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use
              the Service:
            </p>
            <ul>
              <li>In any way that violates any applicable national or international law or regulation</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail," "chain letter," "spam," or any other similar solicitation
              </li>
              <li>
                To impersonate or attempt to impersonate MovieDB, a MovieDB employee, another user, or any other person
                or entity
              </li>
              <li>
                In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent,
                or harmful
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding content provided by users), features, and functionality
              are and will remain the exclusive property of MovieDB and its licensors. The Service is protected by
              copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
              not limited to a breach of the Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue using the Service or contact us to
              request account deletion.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall MovieDB, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <address className={styles.address}>
              MovieDB
              <br />
              123 Movie Street
              <br />
              Los Angeles, CA 90001
              <br />
              Email: terms@moviedb.com
              <br />
              Phone: +1 (555) 123-4567
            </address>
          </section>
        </div>

        <div className={styles.footer}>
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}

