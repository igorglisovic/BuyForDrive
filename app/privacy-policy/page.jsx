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
          <p>
            Welcome to the mobile.de GmbH (hereinafter referred to as
            "mobile.de"), Albert-Einstein-Ring 26, 14532 Kleinmachnow.
          </p>
          <p>
            These GTC-PrD regulate the contractual relationship between
            mobile.de and the users (hereinafter referred to as "participants")
            of the Professional Domain (PrD) of the mobile.de online portal
            including the associated apps (the "mobile.de Service"). Use of the
            mobile.de Service is also subject to the Online vehicle trading
            code, the validity of which all participants explicitly accept when
            they agree to these GTC-PrD.
          </p>
          <p>Article 1 General</p>
          <p>
            1. mobile.de operates databases, accessible via the Internet, in
            which, in the so-called Professional Domain, registered car dealers,
            motorcycle dealers and construction machine dealers (hereinafter
            jointly "participants") may advertise vehicles for sale or as
            leasing offers against payment of a fee (advertisement function),
            and in which motor vehicles can be searched for using the search
            function provided by mobile.de.
          </p>
          <p>
            2. These General Terms and Conditions for the Professional Domain
            ("GTC-PrD") apply exclusively to the relationship between mobile.de
            and the participants using the Professional Domain of the databases
            operated by mobile.de (markets for passenger cars,
            freight/commercial vehicles, motorhomes and motorcycles). Any terms
            and conditions of a participant that contradict the present General
            Terms and Conditions shall not be valid.
          </p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </section>
      </Container>
    </>
  )
}

export default page
