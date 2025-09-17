import { Box, Container, Grid, Typography } from "@material-ui/core";
import type { ComponentType, FC, ReactNode } from "react";

type Props = {
  Buttons: ComponentType[];
  children: ReactNode;
};

export const Layout: FC<Props> = ({ Buttons, children }) => (
  <Container maxWidth="sm">
    <Box sx={{ mt: 10 }}>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item>
          <Typography variant="h2" align="center">
            Ticket system
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item container justifyContent="center" alignItems="center">
            {Buttons.map((Button, index) => (
              <Grid item key={index}>
                <Button />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item style={{ width: "100%" }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  </Container>
);
