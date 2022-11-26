import Footer from "../../components/partials/footer/Footer";
import { loadImageFromFile } from "../createListings/utils";

import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, MenuItem, Paper, TextField } from "@mui/material";
import style from "../createListings/createListings.module.css";
import { toast } from "react-toastify";

function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const {
    reset,
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
      address_1: "",
      address_2: "",
      country: "",
      state: "",
      postal_code: 0,
      description: "",
    },
  });

  const headerOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };

  useEffect(() => {
    const fetchApi = async () => {
        const res = await fetch(
          `https://land-bnb.onrender.com/api/v1/listings/${params.listingID}`,
          { headers: headerOptions })
        //const res = await fetch(`http://localhost:8000/api/v1/listings/${params.listingID}`,{headers:headerOptions})
        const data = await res.json();
        console.log(data);
        setListing(data);
        reset({
          name: data.name,
          price: data.price,
          beds: data.beds,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          address_1: data.address_1,
          address_2: data.address_2,
          country: data.country,
          state: data.state,
          postal_code: data.postal_code,
          description: data.description,
        });
    };
    fetchApi();
  }, [params]);

  useEffect(() => {
    if (listing) {
      setSelectedImages(listing.images_url);
    }
  }, [listing]);

  const handleSelectImage = async (e) => {
    const images = e.target.files;
    let newImages = await Promise.all(
      [...images].map((image) => loadImageFromFile(image))
    );
    console.log(newImages);
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleDeleteImage = (image) => {
    setSelectedImages(
      selectedImages.filter((item) => {
        return item !== image;
      })
    );
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(
      `https://land-bnb.onrender.com/api/v1/user/listing/${params.listingID}`,
      // fetch(`http://localhost:8000/api/v1/user/listing/${params.listingID}`,
      {
        method: "PATCH",
        body: JSON.stringify(getValues()),
        headers: headerOptions,
      }
    )
      .then((response) => {
        toast.success("Edit successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/users/my/listings");
      })

      .catch((err) => {
        toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
      });
  }

  const handleCancel = (e) => {
    navigate("/users/my/listings");
  };

  return (
    <form onSubmit={handleFormSubmit} className={"container-fluid p-0"}>
      {/* select photo and upload it */}
      <div className={"container-xxl mt-4"}>
        <h4>Photos cannot be edited for now</h4>

        {selectedImages?.map((image) => {
          return (
            <div
              style={{
                width: "200px",
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img src={image} key={image} width={"200px"} alt={"listing"}/>
              <Button disabled onClick={() => handleDeleteImage(image)} color={"error"}>
                Delete
              </Button>
            </div>
          );
        })}

        <p className={"text-secondary"}>Tips: png/jpeg only</p>

        {
          <Paper
            className={
              style.photoBox +
              " d-flex align-items-center justify-content-center"
            }
          >
            <label>
              <p>Select images to upload</p>
              <input
                {...register("files")}
                onChange={handleSelectImage}
                name="files"
                multiple
                accept={"image/jpeg, image/png"}
                type="file"
                fullwidth
                //hidden
              />
            
            </label>
            {/* <Button component={"label"}>
              Edit Photo
              <input
                disabled
                onChange={handleSelectImage}
                name={"file"}
                multiple
                accept={"image/jpeg, image/png"}
                type={"file"}
              />
            </Button> */}
          </Paper>
        }
      </div>

      <div className={"container-xxl mt-4"}>
        <h4>Basic info</h4>

        <Paper
          className={
            style.photoBox + " d-flex align-items-center justify-content-center"
          }
        >
          <div className={"row w-100 mt-2"}>
            <div className={"col-5"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    className={"mb-2"}
                    label={"Name"}
                    variant={"standard"}
                    fullWidth
                    error={errors.name ? true : false}
                    {...field}
                    helperText={errors.name && <p>{errors.name.message}</p>}
                  />
                )}
              />

              <Controller
                name="beds"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"beds"}
                    label={"How many beds can guest use?"}
                    className={"mb-2"}
                    select
                    variant={"standard"}
                    fullWidth
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="bedrooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"bedrooms"}
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
                )}
              />

              <Controller
                name="bathrooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"bathrooms"}
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
                )}
              />

              <Controller
                name="state"
                control={control}
                rules={{
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Alphabetical characters only",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    className={"mb-2"}
                    label={"State"}
                    variant={"standard"}
                    fullWidth
                    error={errors.state ? true : false}
                    {...field}
                    helperText={errors.state && <p>{errors.state.message}</p>}
                  />
                )}
              />
            </div>

            <div className={"col-1"}></div>
            <div className={"col-5"}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...register("price", { required: true, min: 1, max: 100 })}
                    {...field}
                    required
                    name={"price"}
                    type={"number"}
                    className={"mb-2"}
                    label={"Price:"}
                    variant={"standard"}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="address_1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"address_1"}
                    label={"Address_1"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="address_2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"address_2"}
                    label={"Address_2"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"country"}
                    label={"Country"}
                    className={"mb-2"}
                    select
                    variant={"standard"}
                    fullWidth
                  >
                    <MenuItem value={"Singapore"}>Singapore</MenuItem>
                    <MenuItem value={"China"}>China</MenuItem>
                    <MenuItem value={"India"}>India</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    name={"postal_code"}
                    label={"Post code"}
                    className={"mb-2"}
                    variant={"standard"}
                    fullWidth
                  />
                )}
              />
            </div>

            <div className={"col-12 mb-4"}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    name={"description"}
                    required
                    label={"Descriptions:"}
                    fullWidth
                    variant={"standard"}
                  />
                )}
              />
            </div>
          </div>
        </Paper>

        <div className={"mt-2 d-flex justify-content-end"}>
          <Button
            onClick={handleCancel}
            variant={"contained"}
            className={"me-2"}
            color={"inherit"}
          >
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} color={"primary"}>
            Confirm
          </Button>
        </div>
      </div>

      <Footer />
    </form>
  );
}

export default EditListing;
