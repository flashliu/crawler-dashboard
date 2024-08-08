import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import { Source, sourceAdd, sourceEdit } from "../../../api/crawler";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";

interface Props {
  onSaved: (data: Source) => void;
}

export interface EditSourceHandle {
  add: () => void;
  edit: (data: Source) => void;
}

const EditSource = React.forwardRef<EditSourceHandle, Props>(
  (props: any, ref: any) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState<string | undefined>(undefined);
    const [id, setId] = React.useState<number>();
    const [type, setType] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    const [pagingField, setPagingField] = React.useState<string>("");
    const [queryTemplate, setQueryTemplate] = React.useState<string>("");
    const [bodyTemplate, setBodyTemplate] = React.useState<string>("");
    const [idRegular, setIdRegular] = React.useState<string>("");
    const [pagingType, setPagingType] = React.useState<string>("");

    const handleEdit = (data: Source) => {
      setOpen(true);
      setTitle("Edit Source");
      setType(data.type);
      setUrl(data.url);
      setPagingField(data.paging_field || "");
      setQueryTemplate(data.query_template || "");
      setBodyTemplate(
        data.body_template ? JSON.stringify(data.body_template) : ""
      );
      setIdRegular(data.id_regular || "");
      setId(data.id);
      setPagingType(data.paging_type || "1");
    };
    const handleAdd = () => {
      setOpen(true);
      setTitle("Add Source");
      setType("");
      setUrl("");
      setPagingField("");
      setQueryTemplate("");
      setBodyTemplate("");
      setIdRegular("");
      setId(undefined);
      setPagingType("1");
    };

    const handleClose = () => {
      setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
      add: handleAdd,
      edit: handleEdit,
    }));

    const bodyTemplateError = React.useMemo(() => {
      try {
        if (bodyTemplate) {
          JSON.parse(bodyTemplate);
        }
        return "";
      } catch (error) {
        return "body template is not valid json";
      }
    }, [bodyTemplate]);

    return (
      <React.Fragment>
        <Dialog
          disableEscapeKeyDown={true}
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              let formJson = Object.fromEntries((formData as any).entries());
              if (formJson.body_template) {
                formJson.body_template = JSON.parse(formJson.body_template);
              } else {
                formJson.body_template = null;
              }

              if (id) {
                formJson.id = id;
              }
              const request = formJson.id ? sourceEdit : sourceAdd;
              request(formJson as Source).then(() => {
                props.onSaved && props.onSaved(formData);
                handleClose();
              });
            },
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="url"
              name="url"
              label="Url"
              fullWidth
              variant="standard"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
              }}
            />
            <FormControl fullWidth variant="standard" required margin="dense">
              <InputLabel id="type-label">type</InputLabel>
              <Select
                required
                labelId="type-label"
                id="type"
                value={type}
                label="type"
                name="type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <MenuItem value="browser">browser</MenuItem>
                <MenuItem value="html">html</MenuItem>
                <MenuItem value="json">json</MenuItem>
                <MenuItem value="unsupported">unsupported</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" required margin="dense">
              <InputLabel id="paging-type">Paging type</InputLabel>
              <Select
                required
                labelId="paging-type"
                id="paging_type"
                value={pagingType}
                label="paging Type"
                name="paging_type"
                onChange={(event) => {
                  setPagingType(event.target.value);
                }}
              >
                <MenuItem value={1}>Page Number</MenuItem>
                <MenuItem value={2}>Offset Number</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              id="paging_field"
              name="paging_field"
              label="paging field"
              fullWidth
              variant="standard"
              value={pagingField}
              onChange={(event) => {
                setPagingField(event.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="query_template"
              name="query_template"
              label="query template"
              fullWidth
              variant="standard"
              value={queryTemplate}
              onChange={(event) => {
                setQueryTemplate(event.target.value);
              }}
            />
            <FormControl
              fullWidth
              variant="standard"
              required
              error={bodyTemplateError.length > 0}
            >
              <TextField
                margin="dense"
                id="body_template"
                name="body_template"
                label="body template"
                fullWidth
                variant="standard"
                value={bodyTemplate}
                multiline
                onChange={(event) => {
                  setBodyTemplate(event.target.value);
                }}
              />
              <FormHelperText>{bodyTemplateError}</FormHelperText>
            </FormControl>
            <TextField
              required
              margin="dense"
              id="id_regular"
              name="id_regular"
              label="Regular expression matching ID from URL"
              fullWidth
              variant="standard"
              value={idRegular}
              onChange={(event) => {
                setIdRegular(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
);

export default EditSource;
