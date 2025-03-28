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

export default function SpamEmail() {
  const content: EmailContent = {
    title: "URGENT: LIMITED TIME OFFER - ACT NOW!!!",
    description:
      "CONGRATULATIONS! You've been selected for our EXCLUSIVE VIP OFFER! Don't miss out on this AMAZING DEAL!",
    cta: "CLAIM YOUR PRIZE NOW",
    links: [
      {
        text: "BUY NOW - LIMITED STOCK!!!",
        url: "https://example.com/urgent-offer",
      },
      { text: "MORE AMAZING DEALS!!!", url: "https://example.com/more-deals" },
      { text: "EXCLUSIVE VIP ACCESS!!!", url: "https://example.com/vip" },
      { text: "SPECIAL BONUS OFFER!!!", url: "https://example.com/bonus" },
      { text: "LAST CHANCE!!!", url: "https://example.com/last-chance" },
      { text: "FREE GIFT INSIDE!!!", url: "https://example.com/free-gift" },
      { text: "MEGA SAVINGS!!!", url: "https://example.com/mega-savings" },
      { text: "EXCLUSIVE MEMBERS ONLY!!!", url: "https://example.com/members" },
    ],
  };

  return (
    <Html>
      <Head />
      <Preview>URGENT: Limited Time Offer Inside!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Hidden text that matches background color */}
          <Text style={{ color: "#ffffff", fontSize: "1px" }}>
            viagra cialis levitra pharmacy drugs medication prescription
          </Text>

          <Heading style={h1}>{content.title}</Heading>

          <Section style={section}>
            <Text style={text}>{content.description}</Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              EXCLUSIVE OFFERS!!!
            </Heading>

            {/* Product image with mismatched dimensions */}
            <Img
              src="https://picsum.photos/400/200"
              width="400"
              height="200"
              alt="Featured product"
              style={{ ...image, width: "600px", height: "300px" }}
            />

            {/* Links section with mismatched colors */}
            {content.links.map((link, index) => (
              <Text key={index} style={text}>
                <Link
                  href={link.url}
                  style={{
                    color: index % 2 === 0 ? "#FF0000" : "#00FF00",
                    textDecoration: "underline",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
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

          {/* Additional spam triggers with mismatched formatting */}
          <Section style={section}>
            <Text style={{ ...text, color: "#FF0000", fontSize: "20px" }}>
              🔥 HOT DEAL ALERT! 🔥
              <br />
              ⚡ LIMITED TIME ONLY! ⚡
              <br />
              🎉 DON'T MISS OUT! 🎉
            </Text>
            <Text style={{ ...text, color: "#00FF00", fontSize: "18px" }}>
              This offer is EXCLUSIVE to you! Share with friends and family to
              get EXTRA BONUS rewards!
            </Text>
          </Section>

          <Section style={section}>
            <Text style={{ ...text, color: "#FF00FF", fontSize: "22px" }}>
              ⚠️ WARNING: This offer expires in 24 hours!
              <br />
              🎁 FREE BONUS GIFT with every purchase!
              <br />
              💰 SAVE UP TO 90% OFF!!!
            </Text>
          </Section>

          <Section style={section}>
            <Text style={{ ...text, color: "#0000FF", fontSize: "24px" }}>
              🏆 YOU'VE BEEN SELECTED AS A VIP CUSTOMER!
              <br />
              🎯 LIMITED TIME ACCESS GRANTED
              <br />⭐ EXCLUSIVE MEMBERS-ONLY PRICING
            </Text>
          </Section>

          <Section style={section}>
            <Text style={{ ...text, color: "#FFA500", fontSize: "26px" }}>
              🚨 ACT NOW BEFORE IT'S TOO LATE!
              <br />
              🎯 LIMITED QUANTITIES AVAILABLE
              <br />
              💫 SPECIAL BONUS OFFER INSIDE
            </Text>
          </Section>

          {/* Hidden text at the bottom */}
          <Text style={{ color: "#ffffff", fontSize: "1px" }}>
            pharmacy drugs medication prescription viagra cialis levitra
          </Text>
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
