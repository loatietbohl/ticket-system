import { useQueryClient } from "react-query";
import io from "socket.io-client";
import { useEffect } from "react";
import type { QueryClient } from "react-query";
import type { TicketHistoryResponse, TicketMessageResponse } from "./types";

const socket = io("http://localhost:3000");

const updateTicketHistory = (
  queryClient: QueryClient,
  response: TicketMessageResponse
) => {
  queryClient.setQueryData<TicketHistoryResponse | undefined>(
    ["ticket", response.ticket.id.toString()],
    (oldData) => {
      if (!oldData) {
        return undefined;
      }
      return {
        ...oldData,
        history: [
          ...oldData.history,
          {
            id: response.id,
            email: response.email,
            message: response.message,
            createdAt: response.createdAt,
          },
        ],
      };
    }
  );
};

export const useWebsocket = (ticketId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("ticketMessage", (payload: TicketMessageResponse) => {
      if (ticketId === payload.ticket.id.toString()) {
        updateTicketHistory(queryClient, payload);
      }
    });

    return () => {
      socket.off("ticketMessage");
      socket.disconnect();
    };
  }, [queryClient, ticketId]);
};
