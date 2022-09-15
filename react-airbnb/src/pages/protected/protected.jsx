import SiteHeader from "../../components/partials/siteHeaders/SiteHeaders";
import Footer from "../../components/partials/footer/Footer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import style from "./protected.module.css";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const navigate = useNavigate();

  // const headerOptions = {
  //   "Content-Type": "application/json",
  //   Authorization: "Bearer " + didToken,
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={"container-fluid p-0"}>
        <div className={"container-xxl mt-4"}>
          <h4>Add photos to your listing</h4>
          <p className={"text-secondary"}>Tips: Only png/jpeg allowed</p>

          <Paper
            className={
              style.photoBox +
              " d-flex align-items-center justify-content-center"
            }
          >
            <Button component={"label"}>
              Upload Photo
              <input accept={"image/jpeg, image/png"} type={"file"} />
            </Button>
          </Paper>
        </div>

        <div className={"container-xxl mt-4"}>
          <h4>Basic info</h4>

          <Paper
            className={
              style.photoBox +
              " d-flex align-items-center justify-content-center"
            }
          >
            <div className={"row w-100 mt-2"}>
              <div className={"col-5"}>
                <TextField
                  className={"mb-2"}
                  label={"Name:"}
                  variant={"standard"}
                  fullWidth
                />

                <TextField
                  label={"Number of guests"}
                  className={"mt-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </TextField>

                <TextField
                  label={"How many beds can guest use?"}
                  className={"mb-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </TextField>

                <TextField
                  label={"Country"}
                  className={"mb-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>Singapore</MenuItem>
                  <MenuItem value={2}>Korean</MenuItem>
                  <MenuItem value={3}>Australia</MenuItem>
                </TextField>

                <TextField
                  label={"State"}
                  className={"mb-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>Ten</MenuItem>
                  <MenuItem value={2}>Twenty</MenuItem>
                  <MenuItem value={3}>Thirty</MenuItem>
                </TextField>
              </div>

              <div className={"col-1"}></div>

              <div className={"col-5"}>
                <TextField
                  className={"mb-2"}
                  label={"Price:"}
                  variant={"standard"}
                  fullWidth
                />
                <TextField
                  label={"How many bedrooms can guests use?"}
                  className={"mt-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </TextField>

                <TextField
                  label={"No of bathrooms"}
                  className={"mb-2"}
                  select
                  variant={"standard"}
                  fullWidth
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </TextField>

                <TextField
                  label={"Address"}
                  className={"mb-2"}
                  variant={"standard"}
                  fullWidth
                />

                <TextField
                  label={"Post code"}
                  className={"mb-2"}
                  variant={"standard"}
                  fullWidth
                />
              </div>

              <div className={"col-12 mb-4"}>
                <TextField
                  label={"Descriptions:"}
                  fullWidth
                  variant={"standard"}
                />
              </div>
            </div>
          </Paper>

          <div className={"mt-2 d-flex justify-content-end"}>
            <Button variant={"contained"} className={"me-2"} color={"inherit"}>
              Cancel
            </Button>

            <Button type={"submit"} variant={"contained"} color={"primary"}>
              Confirm
            </Button>
          </div>
        </div>

        <Footer />
      </form>
    </div>
  );
}

export default Protected;
