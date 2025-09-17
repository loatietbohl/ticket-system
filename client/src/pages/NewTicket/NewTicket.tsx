import { Grid, Button, Paper, Typography, Box } from "@material-ui/core";
import { NewTicketForm } from "./NewTicketForm";
import { Layout } from "../../components";
import { NavButtons } from "../../components/Layout";
import { useMutation } from "react-query";
import axios from "axios";
import type { FormData } from "./types";
import { Link } from "react-router-dom";

export const NewTicket = () => {
  const { mutate, isSuccess, isLoading, reset, data } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post("http://localhost:3000/tickets", formData);
      return res.data;
    },
  });

  const onSubmit = (formData: FormData) => mutate(formData);
  const newTicket = () => reset();

  return (
    <Layout Buttons={[NavButtons.Search]}>
      <Paper
        elevation={1}
        style={{
          width: 320,
          margin: "auto",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #CCC",
        }}
      >
        {isSuccess ? (
          <Box>
            <Typography>Ticket submitted!</Typography>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button variant="contained" onClick={newTicket}>
                  New ticket
                </Button>
              </Grid>
              <Grid item>
                <Link to={`/ticket/${data.id}`}>
                  <Button variant="contained">View ticket</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <NewTicketForm onSubmit={onSubmit} isLoading={isLoading} />
        )}
      </Paper>
    </Layout>
  );
};
