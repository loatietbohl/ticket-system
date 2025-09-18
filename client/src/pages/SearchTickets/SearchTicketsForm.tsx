import { useForm } from "react-hook-form";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import type { FC } from "react";
import { formFields } from "../../utils";
import type { FormData } from "./types";

type Props = {
  defaultValue?: string;
  onSubmit: (s: FormData) => void;
};

export const SearchTicketsForm: FC<Props> = ({ defaultValue, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      <Typography align="center">Search for a ticket</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center">
          <TextField
            label={formFields.email.label}
            margin="normal"
            autoComplete="off"
            defaultValue={defaultValue}
            {...register("email", formFields.email.validation)}
            error={!!errors.email}
            helperText={errors.email?.message}
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
    </>
  );
};
