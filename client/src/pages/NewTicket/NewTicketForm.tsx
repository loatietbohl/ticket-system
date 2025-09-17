import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Box } from "@material-ui/core";
import type { FC } from "react";
import { formFields } from "../../utils";
import type { FormData } from "./types";

type Props = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

const fields = {
  email: formFields.email,
  title: {
    label: "Title",
    validation: {
      required: "Title is required",
    },
  },
  message: {
    label: "Message",
    validation: {
      required: "Message is required",
    },
  },
};

export const NewTicketForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      {isLoading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <Typography>Open a ticket</Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={formFields.email.label}
          fullWidth
          margin="normal"
          autoComplete="off"
          {...register("email", formFields.email.validation)}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label={fields.title.label}
          fullWidth
          margin="normal"
          {...register("title", fields.title.validation)}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label={fields.message.label}
          fullWidth
          margin="normal"
          multiline
          minRows={4}
          {...register("message", fields.message.validation)}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="contained"
            style={{ display: isLoading ? "none" : "block" }}
          >
            Send
          </Button>
        </Box>
      </form>
    </>
  );
};
