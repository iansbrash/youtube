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

interface EmailLink {
  text: string;
  url: string;
}

interface EmailContent {
  title: string;
  description: string;
  cta: string;
  links: EmailLink[];
}

export default function CleanEmail() {
  const content: EmailContent = {
    title: "Special Offer: 20% Off Your Next Purchase",
    description:
      "We're excited to offer you an exclusive discount on your next order.",
    cta: "Shop Now",
    links: [
      { text: "View Products", url: "https://example.com/products" },
      { text: "Customer Support", url: "https://example.com/support" },
    ],
  };

  return (
    <Html>
      <Head />
      <Preview>Special Offer Inside!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{content.title}</Heading>

          <Section style={section}>
            <Text style={text}>{content.description}</Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              Featured Products
            </Heading>

            {/* Product image */}
            <Img
              src="https://picsum.photos/400/200"
              width="400"
              height="200"
              alt="Featured product"
              style={image}
            />

            {/* Links section */}
            {content.links.map((link, index) => (
              <Text key={index} style={text}>
                <Link
                  href={link.url}
                  style={{ color: "#2754C5", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </Link>
              </Text>
            ))}
          </Section>

          <Section style={section}>
            <Button style={button}>{content.cta}</Button>
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
