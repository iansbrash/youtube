import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LinterExampleEmailProps {
  previewText?: string;
}

export default function LinterExampleEmail({
  previewText = "Check out our latest newsletter!",
}: LinterExampleEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Our Newsletter!</Heading>

          {/* Section 1: Links demonstration */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Featured Links
            </Heading>
            <Text style={text}>Here are some links to check out:</Text>
            <Text style={text}>
              {/* Valid HTTPS link */}
              <Link href="https://example.com" style={link}>
                Valid HTTPS Link
              </Link>
            </Text>
            <Text style={text}>
              {/* Invalid HTTP link (will trigger linter warning) */}
              <Link href="http://insecure-example.com" style={link}>
                Insecure HTTP Link
              </Link>
            </Text>
            <Text style={text}>
              {/* Broken link (will trigger linter warning) */}
              <Link href="https://this-is-a-broken-link.com" style={link}>
                Broken Link
              </Link>
            </Text>
          </Section>

          {/* Section 2: Images demonstration */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Featured Images
            </Heading>

            {/* Image with alt text and reasonable size */}
            <Img
              src="https://picsum.photos/400/200"
              width="400"
              height="200"
              alt="Random image with alt text"
              style={image}
            />

            {/* Image without alt text (will trigger linter warning) */}
            <Img
              src="https://picsum.photos/400/200"
              width="400"
              height="200"
              style={image}
            />

            {/* Large image (will trigger linter warning) */}
            <Img
              src="https://picsum.photos/2000/1000"
              width="2000"
              height="1000"
              alt="Large image that exceeds size limit"
              style={image}
            />
          </Section>

          <Section style={section}>
            <Button style={button}>Subscribe Now</Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
  marginBottom: "24px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0 0 16px",
};

const text = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 12px",
};

const link = {
  color: "#2754C5",
  fontSize: "16px",
  textDecoration: "underline",
};

const image = {
  margin: "0 auto",
  maxWidth: "100%",
  borderRadius: "5px",
};

const button = {
  backgroundColor: "#2754C5",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
};
