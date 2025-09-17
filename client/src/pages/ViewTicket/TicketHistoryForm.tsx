import { useForm } from "react-hook-form";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import axios from "axios";
import { useMutation } from "react-query";
import { useEffect, type FC } from "react";
import type { TicketMessageResponse } from "./types";

type FormData = {
  message: string;
};

type Props = {
  messagePayload: {
    id: number;
    email: string;
  };
};

const fields = {
  message: {
    label: "Message",
    validation: {
      required: "Message is required",
    },
  },
};

export const TicketHistoryForm: FC<Props> = ({ messagePayload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<FormData>();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post<TicketMessageResponse>(
        `http://localhost:3000/tickets/${messagePayload.id}`,
        {
          ...formData,
          email: messagePayload.email,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      reset();
    },
  });

  useEffect(() => {
    const followMessageTextField = () => {
      setFocus("message");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };
    followMessageTextField();
  }, [data, setFocus, reset]);

  const onSubmit = async (formData: FormData) => mutate(formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center">
        <TextField
          label={fields.message.label}
          margin="normal"
          fullWidth
          disabled={isLoading}
          autoComplete="off"
          {...register("message", fields.message.validation)}
          error={!!errors.message}
          helperText={errors.message?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit" size="small">
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </form>
  );
};
