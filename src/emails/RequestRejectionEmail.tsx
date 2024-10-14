import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Hr } from "@react-email/hr";
import { Section } from "@react-email/section";
import { Row } from "@react-email/row";
import { Column } from "@react-email/column";
import { Heading } from "@react-email/heading";
import { Link } from "@react-email/link";

type Props = {
  name: string;
  appUrl: string;
  event_title: string;
  event_date: string;
};

const RequestRejectionEmail = ({
  name,
  appUrl,
  event_title,
  event_date,
}: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Rental Requirements</Preview>
      <Body>
        <Container>
          <Section>
            <Text>Hello {name || "Joe"}</Text>
            <Text>
              We are sorry to hear that your rental request has been rejected.
              Please contact us for further information.
            </Text>
          </Section>

          <Section>
            <Hr style={hr} />
            <Text style={paragraph}>
              For more details, visit <Link href={appUrl || "#"}>VLT-Hub</Link>
            </Text>
          </Section>

          <Section>
            <Text style={paragraph}>The VLT-Hub team</Text>
            <Hr style={hr} />
            <Text style={footer}>
              Copyrighted {new Date().getFullYear()} VLT-Hub. All rights
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#2471fb",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

export default RequestRejectionEmail;
