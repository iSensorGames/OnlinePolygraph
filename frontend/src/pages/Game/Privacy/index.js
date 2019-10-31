import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

// Components
import Markdown from "../../../modules/components/Markdown";
import Typography from "../../../modules/components/Typography";
import privacy from "../../../modules/views/privacy.md";
import AppFooter from "../../../modules/views/AppFooter";

// Layout
import BaseLayout from "../../../layout/Base";

function Privacy() {
  return (
    <BaseLayout>
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </BaseLayout>
  );
}

export default Privacy;
