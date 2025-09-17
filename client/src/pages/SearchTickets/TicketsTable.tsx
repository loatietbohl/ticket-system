import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import type { TicketResponse } from "./types";
import type { FC } from "react";

type Props = {
  data: TicketResponse;
};

export const TicketsTable: FC<Props> = ({ data }) => {
  const history = useHistory();
  return (
    <>
      <Typography style={{ marginBottom: "8px" }}>Select a ticket</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell width="100px">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => history.push(`/tickets/${row.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  {row.title}
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
