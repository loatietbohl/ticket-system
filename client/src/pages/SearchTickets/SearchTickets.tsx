import { Box, Grid, Typography } from "@material-ui/core";
import { Layout } from "../../components";
import { SearchTicketsForm } from "./SearchTicketsForm";
import { TicketsTable } from "./TicketsTable";
import { useQuery } from "react-query";
import type { FormData, TicketResponse } from "./types";
import { NavButtons } from "../../components/Layout";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

const filtersAtom = atom<FormData | null>({
  key: "filtersAtom",
  default: null,
});

export const SearchTickets = () => {
  const [filters, setFilters] = useRecoilState(filtersAtom);

  const { data, isLoading } = useQuery<TicketResponse>(
    ["tickets", filters],
    async () => {
      const res = await axios.get("http://localhost:3000/tickets", {
        params: { email: filters?.email },
      });
      return res.data;
    },
    {
      enabled: !!filters,
    }
  );

  return (
    <Layout Buttons={[NavButtons.New]}>
      <SearchTicketsForm
        defaultValue={filters?.email}
        setFilters={(s: FormData) => setFilters(s)}
      />
      <Box style={{ marginTop: "25px" }}>
        <Grid container justifyContent="center">
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : !data ? null : data.length === 0 ? (
            <Typography>No tickets found</Typography>
          ) : (
            <TicketsTable data={data} />
          )}
        </Grid>
      </Box>
    </Layout>
  );
};
