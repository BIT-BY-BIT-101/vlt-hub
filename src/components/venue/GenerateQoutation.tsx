import React, { useEffect, useRef, useState } from "react";
import { generatePDF } from "../../helpers/QoutationGenerator";
import { IonPage, IonContent, IonButton } from "@ionic/react";

const GenerateQoutation = () => {
  const frontPageRef = useRef<HTMLDivElement | null>(null);
  const venueRequirementsRef = useRef<HTMLDivElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true once the component has mounted and rendered
    setIsLoaded(true);
  }, []);

  async function handleGeneratePDF() {
    if (!isLoaded) return;

    await generatePDF([frontPageRef, venueRequirementsRef]);
  }

  const styles = {
    padding: "20px",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
    color: "black",
  };

  return (
    <IonPage>
      <IonButton expand="full" onClick={handleGeneratePDF} disabled={!isLoaded}>
        Download Proposal as PDF
      </IonButton>
      <IonContent style={{ maxWidth: "800px", width: "800px" }}>
        <div ref={frontPageRef} style={{ ...styles }}>
          {/* Proposal Header */}
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Rental Proposal
          </h1>

          {/* Client and Proposal Details */}
          <p>KNOWN ALL MEN BY THES PRESENTS:</p>
          <br />
          <p>This agreement is made and entered into, by and between:</p>
          <br />
          <table>
            <tr>
              <td width={"40px"}></td>
              <td>LESSOR:</td>
              <td>: SM PRIME HOLDINGS INC.:</td>
            </tr>
            <br />
            <tr>
              <td width={"40px"}></td>
              <td>ADDRESS:</td>
              <td>: [Address]</td>
            </tr>
            <br />
            <tr>
              <td width={"40px"}></td>
              <td>AUTHORIZED REPRESENTATIVE:</td>
            </tr>
            <tr>
              <td width={"40px"}></td>
              <td width={"40px"}></td>
              <td>
                <p>MR. JOHN DOE</p>
                <small>Manager</small>
              </td>
            </tr>
            <br />
            <tr>
              <td></td>
              <td>CONTACT Number</td>
              <td>: 123-456-7890</td>
            </tr>
          </table>
          <br />
          <p>Hereinafter referred to as the "LESSOR";</p>
          <p style={{ textAlign: "center" }}>-and-</p>
          <table>
            <tr>
              <td width={"40px"}></td>
              <td>LESSE</td>
              <td>: [Organization/Company Name]</td>
            </tr>
            <br />

            <tr>
              <td width={"40px"}></td>
              <td>ADDRESS:</td>
              <td>: [Address]</td>
            </tr>
            <br />

            <tr>
              <td width={"40px"}></td>
              <td>AUTHORIZED REPRESENTATIVE:</td>
            </tr>
            <tr>
              <td width={"40px"}></td>
              <td width={"40px"}></td>
              <td>
                <p>[FULL NAME]</p>
                <small>[Position]</small>
              </td>
            </tr>
            <br />
            <tr>
              <td width={"40px"}></td>
              <td>CONTACT Number</td>
              <td>: 123-456-7890</td>
            </tr>
          </table>
        </div>

        <div style={styles} ref={venueRequirementsRef}>
          <h3>Venue Requirements</h3>
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
              Python Crash Course
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
            HAVING FULLY READ, AND UNDERSTOOD OF, AND IN AGREEMENT TO ALL
            COVENANTS, TERMS, AND CONDITIONS, WE HEREBY AFFIX OUR SIGNATURE ON
            ___________ AT _______________ PHILIPPINES.
          </p>
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table style={{ textAlign: "center" }}>
              <tr>
                <td>[LESSOR]</td>
                <td>[LESSE]</td>
              </tr>
              <br />
              <tr>
                <td>
                  <strong>SMX PRIME HOLDINGS</strong>
                </td>
                <td>
                  <strong>[ORGANIZATION/COMPANY NAME]</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <p>MR. JOHN DOE</p>
                  <small>Senior Branch Manager</small>
                </td>
                <td>
                  <p>[COMPANY REPRESENTATIVE]</p>
                  <small>[Position]</small>
                </td>
              </tr>
            </table>
          </div>
          <br />
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GenerateQoutation;
