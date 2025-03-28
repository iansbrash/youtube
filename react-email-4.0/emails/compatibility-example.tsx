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

export default function CompatibilityExample() {
  return (
    <Html>
      <Head />
      <Preview>Check out our latest newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Our Newsletter!</Heading>

          {/* Section 1: CSS Grid (not supported in Outlook) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Featured Products
            </Heading>
            <div style={gridContainer}>
              <div style={gridItem}>
                <Img
                  src="https://picsum.photos/200/200"
                  width="200"
                  height="200"
                  alt="Product 1"
                  style={image}
                />
                <Text style={text}>Product 1</Text>
              </div>
              <div style={gridItem}>
                <Img
                  src="https://picsum.photos/200/200"
                  width="200"
                  height="200"
                  alt="Product 2"
                  style={image}
                />
                <Text style={text}>Product 2</Text>
              </div>
              <div style={gridItem}>
                <Img
                  src="https://picsum.photos/200/200"
                  width="200"
                  height="200"
                  alt="Product 3"
                  style={image}
                />
                <Text style={text}>Product 3</Text>
              </div>
            </div>
          </Section>

          {/* Section 2: Flexbox (not supported in Outlook) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Special Offers
            </Heading>
            <div style={flexContainer}>
              <div style={flexItem}>
                <Text style={text}>20% OFF</Text>
              </div>
              <div style={flexItem}>
                <Text style={text}>FREE SHIPPING</Text>
              </div>
              <div style={flexItem}>
                <Text style={text}>BONUS GIFT</Text>
              </div>
            </div>
          </Section>

          {/* Section 3: SVG (not supported in Gmail) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Our Logo
            </Heading>
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              style={svg}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="shadow">
                  <feDropShadow
                    dx="2"
                    dy="2"
                    stdDeviation="2"
                    floodColor="#000"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="#2754C5"
                filter="url(#shadow)"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="40"
                fontFamily="Arial"
                fontWeight="bold"
                transform="rotate(0 50 50)"
              >
                L
              </text>
            </svg>
          </Section>

          {/* Section 3.5: Complex SVG (not supported in Gmail) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Decorative Pattern
            </Heading>
            <svg width="200" height="100" viewBox="0 0 200 100" style={svg}>
              {/* Simple gradient that Gmail doesn't support */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#2754C5" }} />
                  <stop offset="100%" style={{ stopColor: "#1a1a1a" }} />
                </linearGradient>
              </defs>

              {/* Background with gradient */}
              <rect width="200" height="100" fill="url(#gradient)" />

              {/* Simple shapes with stroke */}
              <circle
                cx="100"
                cy="50"
                r="30"
                fill="white"
                stroke="#2754C5"
                strokeWidth="2"
              />
              <path
                d="M100,20 L120,50 L100,80 L80,50 Z"
                fill="white"
                stroke="#2754C5"
                strokeWidth="2"
              />
            </svg>
          </Section>

          {/* Section 4: CSS Animations (not supported in most email clients) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Limited Time Offer
            </Heading>
            <div style={animationContainer}>
              <Text style={text}>Don't miss out!</Text>
            </div>
          </Section>

          {/* Section 5: CSS Variables (not supported in most email clients) */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Featured Content
            </Heading>
            <div style={cssVarContainer}>
              <Text style={text}>Special content here</Text>
            </div>
          </Section>

          {/* Section 6: Modern CSS Properties */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Modern Design
            </Heading>
            <div style={modernContainer}>
              <Text style={text}>Modern styling here</Text>
            </div>
          </Section>

          <Section style={section}>
            <Button style={button}>Shop Now</Button>
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

// CSS Grid (not supported in Outlook)
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  margin: "20px 0",
};

const gridItem = {
  textAlign: "center" as const,
};

// Flexbox (not supported in Outlook)
const flexContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
};

const flexItem = {
  flex: "1",
  margin: "0 10px",
};

// SVG (not supported in Gmail)
const svg = {
  margin: "0 auto",
  display: "block",
};

// CSS Animations (not supported in most email clients)
const animationContainer = {
  animation: "fadeIn 1s ease-in",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

// CSS Variables (not supported in most email clients)
const cssVarContainer = {
  "--primary-color": "#2754C5",
  "--secondary-color": "#1a1a1a",
  color: "var(--primary-color)",
  backgroundColor: "var(--secondary-color)",
  padding: "20px",
};

// Modern CSS Properties
const modernContainer = {
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "20px",
};
