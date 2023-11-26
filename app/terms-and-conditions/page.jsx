'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import React from 'react'

const page = () => {
  return (
    <>
      <Container>
        <Breadcrumb />
        <section className="py-8 px-10 my-12 bg-white rounded-[30px] shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            General Terms & Conditions
          </h1>
          <div className="text-sm flex flex-col gap-3">
            <p>
              *Please note that the information provided within this document
              and the functioning of the Demo Application are for demonstration
              purposes only and do not represent actual services or
              functionalities.
            </p>
            <p>
              These regulate the contractual relationship between sell a car app
              and the users (hereinafter referred to as "participants") of the
              Professional Domain of the sell a car app online portal including
              the associated apps (the "sell a car app Service"). Use of the
              sell a car app Service is also subject to the Online vehicle
              trading code, the validity of which all participants explicitly
              accept when they agree to these.
            </p>
            <p className="font-semibold">1. General</p>
            <p>
              1.1 These General Terms & Conditions ("Terms") govern your use of
              the [Your Car Selling Application Name] ("the Application")
              operated by [Your Company Name] ("the Company," "we," "us," or
              "our").
            </p>
            <p>
              1.2 By accessing or using the Application, you agree to be bound
              by these Terms. If you do not agree with any part of these Terms,
              you must not use the Application.
            </p>
            <p className="font-semibold">2. Use of the Application</p>
            <p>
              2.1 Eligibility: By using the Application, you represent and
              warrant that you are at least 18 years old and have the legal
              capacity to enter into this agreement.
            </p>
            <p>
              2.2 Account Registration: You may need to create an account to
              access certain features of the Application. You are responsible
              for maintaining the confidentiality of your account information
              and agree to accept responsibility for all activities that occur
              under your account.
            </p>
            <p>
              2.3 Use Restrictions: You agree not to use the Application for any
              unlawful purpose or in any way that could damage, disable,
              overburden, or impair the Application. You shall not attempt to
              gain unauthorized access to any portion of the Application, or any
              systems or networks connected to the Application.
            </p>
            <p className="font-semibold">3. Car Listings</p>
            <p>
              3.1 Listing Information: The Application allows users to list
              vehicles for sale. By submitting a vehicle listing, you agree that
              all information provided is accurate, complete, and up-to-date.
              The Company reserves the right to verify the information provided
              and may remove or edit listings that do not comply with our
              policies.
            </p>
            <p>
              3.2 Transaction Responsibility: The Company is not a party to any
              transaction between users of the Application. We do not guarantee
              the quality, safety, or legality of the vehicles listed, the
              accuracy of listings, the ability of sellers to sell items, or the
              ability of buyers to pay for items.
            </p>
            <p className="font-semibold">4. Fees and Payments</p>
            <p>
              4.1 The use of the Application may be subject to fees. Any
              applicable fees will be clearly communicated to you before you
              incur them.
            </p>
            <p>
              4.2 You agree to pay all fees and charges incurred in connection
              with your use of the Application, and you authorize the Company to
              charge your chosen payment method for any such fees.
            </p>
            <p className="font-semibold">5. Intellectual Property</p>
            <p>
              5.1 The content and materials available on the Application are
              owned by the Company and are protected by copyright, trademark,
              and other intellectual property laws.
            </p>
            <p>
              5.2 You are granted a limited, non-exclusive, non-transferable,
              and revocable license to access and use the Application for its
              intended purpose.
            </p>
            <p className="font-semibold">6. Disclaimer of Warranties</p>
            <p>
              6.1 The Application is provided on an "as is" and "as available"
              basis. We make no warranties or representations about the accuracy
              or completeness of the content available on the Application.
            </p>
            <p className="font-semibold">7. Limitation of Liability</p>
            <p>
              7.1 To the fullest extent permitted by law, the Company shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses.
            </p>
            <p className="font-semibold">8. Governing Law</p>
            <p>
              8.1 These Terms shall be governed by and construed in accordance
              with the laws of [Your Jurisdiction], without regard to its
              conflict of law provisions.
            </p>
            <p className="font-semibold">9. Changes to Terms</p>
            <p>
              9.1 The Company reserves the right to modify or replace these
              Terms at any time. It is your responsibility to review these Terms
              periodically for changes.
            </p>
            <p className="font-semibold">10. Contact Information</p>
            <p>
              10.1 If you have any questions about these Terms, please contact
              us at [Your Contact Information].
            </p>
          </div>
        </section>
      </Container>
    </>
  )
}

export default page
