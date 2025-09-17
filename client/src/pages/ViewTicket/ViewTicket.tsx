import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Layout } from "../../components";
import { NavButtons } from "../../components/Layout";
import type { TicketHistoryResponse } from "./types";
import { TicketHistory } from "./TicketHistory";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";

export const ViewTicket = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<TicketHistoryResponse>(
    ["ticket", id],
    async () => {
      const res = await axios.get(`http://localhost:3000/tickets/${id}`);
      return res.data;
    }
  );

  return (
    <Layout Buttons={Object.values(NavButtons)}>
      {isLoading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        data && (
          <>
            <Link to="/search">
              <Button style={{ marginBottom: "30px" }}>←</Button>
            </Link>
            <TicketHistory data={data} />
          </>
        )
      )}
    </Layout>
  );
};
