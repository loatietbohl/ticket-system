import { Box, Grid, Paper, Typography } from "@material-ui/core";
import type { TicketHistoryResponse } from "./types";
import type { FC } from "react";
import { TicketHistoryForm } from "./TicketHistoryForm";

type Props = {
  data: TicketHistoryResponse;
};

export const TicketHistory: FC<Props> = ({ data }) => (
  <>
    <Grid container justifyContent="space-between">
      <Grid item>Title: {data.title}</Grid>
      <Grid item>Status: {data.status}</Grid>
    </Grid>
    <Paper style={{ padding: 16, marginTop: 32 }}>
      {data.history.map((row) => (
        <Paper
          key={row.id}
          style={{
            padding: 8,
            marginBottom: 8,
            position: "relative",
            backgroundColor: "#363434",
          }}
        >
          <Typography
            variant="caption"
            style={{ position: "absolute", top: 4, left: 8 }}
          >
            {row.createdAt}
          </Typography>
          <Typography
            variant="caption"
            style={{ position: "absolute", top: 4, right: 8 }}
          >
            {row.email}
          </Typography>
          <Box mt={2}>
            <Typography>{row.message}</Typography>
          </Box>
        </Paper>
      ))}
      <TicketHistoryForm messagePayload={{ id: data.id, email: data.email }} />
    </Paper>
  </>
);
