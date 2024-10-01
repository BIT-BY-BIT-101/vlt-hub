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

import Logo from "../assets/logo.png";

type WelcomeEmailProps = {
  appUrl: string;
  firestName: string;
};

const WelcomeEmail = ({ appUrl, firestName = "Juan" }: WelcomeEmailProps) => {
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

  return (
    <Html>
      <Head />
      <Preview>Welcome to Venue Learners Training Hub</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img src={Logo} width="170" height="50" alt="Koala" style={logo} /> */}
          <Text style={paragraph}>Hi {firestName},</Text>
          <Text style={paragraph}>
            Welcome to Venue Learners Training Hub! We are thrilled to have you
            join our community of passionate learners and professionals.
          </Text>
          <Text style={paragraph}>
            At Venue Learners, we aim to provide you with the best tools,
            resources, and support to help you grow and succeed. Whether you're
            here to sharpen your skills or learn something new, you're in the
            right place!
          </Text>
          <Text style={paragraph}>
            To get things going, just click the button below to get started.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={appUrl}>
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>The VLT-Hub team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Copyrighted {new Date().getFullYear()} VLT-Hub. All rights
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
