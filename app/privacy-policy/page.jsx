'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import React from 'react'

const page = () => {
  return (
    <>
      <Container>
        <Breadcrumb />
        <section className="py-8 sm:px-10 px-6 my-12 bg-white rounded-[30px] shadow-md">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
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
            <p className="font-semibold">1. Information Collection</p>
            <p>
              1.1 Personal Identification Information: The Demo Application may
              collect personal identification information from Users in various
              ways, including, but not limited to, when Users visit the Demo
              Application and interact with its features. This information may
              include names, email addresses, phone numbers, and other details
              voluntarily provided by Users.
            </p>
            <p>
              1.2 Non-personal Identification Information: The Demo Application
              may collect non-personal identification information about Users
              whenever they interact with the Demo Application. Non-personal
              identification information may include the browser name, type of
              device, and technical information about Users' means of connection
              to the Demo Application.
            </p>
            <p className="font-semibold">2. Information Use</p>
            <p>
              2.1 The Demo Application may collect and use Users' personal
              information for the following purposes: To personalize user
              experience: Information collected helps in providing personalized
              features. To improve customer service: Data helps in responding
              more effectively to customer service requests and support needs.
              To send periodic emails: The email address provided by Users may
              be used to send information and updates related to their inquiries
              or requests.
            </p>
            <p className="font-semibold">3. Information Protection</p>
            <p>
              3.1 The Demo Application adopts appropriate data collection,
              storage, and processing practices and security measures to protect
              against unauthorized access, alteration, disclosure, or
              destruction of personal information and data stored within the
              Demo Application.
            </p>
            <p className="font-semibold">4. Sharing Personal Information</p>
            <p>
              4.1 The Demo Application does not sell, trade, or rent Users'
              personal identification information to others.
            </p>
            <p className="font-semibold">5. Changes to Privacy Policy</p>
            <p>
              5.1 The Demo Application has the discretion to update this Privacy
              Policy at any time. When we do, we will revise the updated date at
              the bottom of this page.
            </p>
            <p className="font-semibold">6. User Acceptance</p>
            <p>
              6.1 By using the Demo Application, you signify your acceptance of
              this Privacy Policy. If you do not agree to this Privacy Policy,
              please do not use the Demo Application.
            </p>
            <p className="font-semibold">7. Contact Us</p>
            <p>
              7.1 If you have any questions about this Privacy Policy or the
              practices of the Demo Application, please contact us at contact
              service.
            </p>
            <p className="font-semibold">8. Last Updated</p>
            <p>8.1 This Privacy Policy was last updated at 2023.</p>
          </div>
        </section>
      </Container>
    </>
  )
}

export default page
