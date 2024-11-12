import React, { useEffect, useRef, useState } from "react";
import { generatePDF } from "../../helpers/QoutationGenerator";
import { IonPage, IonContent, IonButton } from "@ionic/react";

const GenerateQoutation = () => {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true once the component has mounted and rendered
    setIsLoaded(true);
  }, []);

  async function handleGeneratePDF() {
    if (!isLoaded) return;

    await generatePDF(pdfRef);
  }
  return (
    <IonPage>
      <IonButton expand="full" onClick={handleGeneratePDF} disabled={!isLoaded}>
        Download Proposal as PDF
      </IonButton>
      <IonContent>
        <div
          ref={pdfRef}
          style={{
            padding: "20px",
            backgroundColor: "white",
            fontFamily: "Arial, sans-serif",
            color: "black",
          }}
        >
          {/* Proposal Header */}
          <h2 style={{ textAlign: "center" }}>Venue and Catering Proposal</h2>
          <p style={{ textAlign: "center" }}>
            <strong>Prepared for:</strong> SMX Prime Holdings
            <br />
            <strong>Purpose:</strong> Stakeholders Assembly
            <br />
            <strong>Date:</strong> October 15, 2024
          </p>

          {/* Client and Proposal Details */}
          <h3>Client Information</h3>
          <p>
            <strong>Client Name:</strong> `[Client Name]`
          </p>
          <p>
            <strong>Event:</strong> [Event Name]
          </p>
          <p>
            <strong>Contact Person:</strong> [Client Name]
          </p>
          <p>
            <strong>Email:</strong> [Client Email]
          </p>
          <p>
            <strong>Phone:</strong> [Contact Number]
          </p>

          <h3>Proposal Summary</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Description
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Details
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Cost (PHP)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Venue Rental
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Function Hall 1
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  150,000
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Catering Services
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Lunch and Snacks for 200 attendees
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  45,000
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Audio-Visual Equipment
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  Projectors, Microphones, and Speakers
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  25,000
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <strong>Total</strong>
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}></td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <strong>PHP 220,000</strong>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Scope of Services */}
          <h3>Scope of Services</h3>
          <ul>
            <li>
              Provision of venue and facilities at SMX Convention Center for the
              [Event Name]
            </li>
            <li>
              Full catering service including lunch and snacks for all attendees
            </li>
            <li>
              Access to audio-visual equipment and technical support during the
              event
            </li>
            <li>Security personnel for event safety and management</li>
            <li>Compliance with all relevant data privacy regulations</li>
          </ul>

          {/* Terms and Conditions */}
          <h3>Terms and Conditions</h3>
          <ul>
            <li>A 50% down payment is required to confirm the booking.</li>
            <li>
              Full payment must be completed 7 days prior to the event date.
            </li>
            <li>
              Any damages to the venue or equipment will be the responsibility
              of the client.
            </li>
            <li>
              Cancellations made within 14 days of the event are non-refundable.
            </li>
            <li>
              All data shared with SMX Prime Holdings will be protected in
              accordance with our data privacy policy.
            </li>
          </ul>

          {/* Data Privacy and Compliance */}
          <h3>Data Privacy and Compliance</h3>
          <p>
            SMX Prime Holdings complies with all applicable data privacy laws.
            All personal information collected will be used exclusively for
            event management and will be handled in accordance with our privacy
            policy, which ensures data protection and limited access to
            sensitive information.
          </p>

          {/* Acceptance Section */}
          <h3>Acceptance</h3>
          <p>
            By signing below, SMX Prime Holdings agrees to the terms and
            conditions outlined in this proposal for the lease of venue and
            catering services.
          </p>
          <p>__________________________</p>
          <p>Authorized Signature</p>
          <p>Date: _____________________</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GenerateQoutation;
