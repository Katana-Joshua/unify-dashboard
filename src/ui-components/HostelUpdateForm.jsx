/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Hostel } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HostelUpdateForm(props) {
  const {
    id: idProp,
    hostel,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    lat: "",
    lng: "",
    hostelName: "",
    address: "",
    street: "",
    building: "",
  };
  const [lat, setLat] = React.useState(initialValues.lat);
  const [lng, setLng] = React.useState(initialValues.lng);
  const [hostelName, setHostelName] = React.useState(initialValues.hostelName);
  const [address, setAddress] = React.useState(initialValues.address);
  const [street, setStreet] = React.useState(initialValues.street);
  const [building, setBuilding] = React.useState(initialValues.building);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = hostelRecord
      ? { ...initialValues, ...hostelRecord }
      : initialValues;
    setLat(cleanValues.lat);
    setLng(cleanValues.lng);
    setHostelName(cleanValues.hostelName);
    setAddress(cleanValues.address);
    setStreet(cleanValues.street);
    setBuilding(cleanValues.building);
    setErrors({});
  };
  const [hostelRecord, setHostelRecord] = React.useState(hostel);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Hostel, idProp) : hostel;
      setHostelRecord(record);
    };
    queryData();
  }, [idProp, hostel]);
  React.useEffect(resetStateValues, [hostelRecord]);
  const validations = {
    lat: [{ type: "Required" }],
    lng: [{ type: "Required" }],
    hostelName: [{ type: "Required" }],
    address: [{ type: "Required" }],
    street: [],
    building: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          lat,
          lng,
          hostelName,
          address,
          street,
          building,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Hostel.copyOf(hostelRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HostelUpdateForm")}
      {...rest}
    >
      <TextField
        label="Lat"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={lat}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              lat: value,
              lng,
              hostelName,
              address,
              street,
              building,
            };
            const result = onChange(modelFields);
            value = result?.lat ?? value;
          }
          if (errors.lat?.hasError) {
            runValidationTasks("lat", value);
          }
          setLat(value);
        }}
        onBlur={() => runValidationTasks("lat", lat)}
        errorMessage={errors.lat?.errorMessage}
        hasError={errors.lat?.hasError}
        {...getOverrideProps(overrides, "lat")}
      ></TextField>
      <TextField
        label="Lng"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={lng}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              lat,
              lng: value,
              hostelName,
              address,
              street,
              building,
            };
            const result = onChange(modelFields);
            value = result?.lng ?? value;
          }
          if (errors.lng?.hasError) {
            runValidationTasks("lng", value);
          }
          setLng(value);
        }}
        onBlur={() => runValidationTasks("lng", lng)}
        errorMessage={errors.lng?.errorMessage}
        hasError={errors.lng?.hasError}
        {...getOverrideProps(overrides, "lng")}
      ></TextField>
      <TextField
        label="Hostel name"
        isRequired={true}
        isReadOnly={false}
        value={hostelName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lat,
              lng,
              hostelName: value,
              address,
              street,
              building,
            };
            const result = onChange(modelFields);
            value = result?.hostelName ?? value;
          }
          if (errors.hostelName?.hasError) {
            runValidationTasks("hostelName", value);
          }
          setHostelName(value);
        }}
        onBlur={() => runValidationTasks("hostelName", hostelName)}
        errorMessage={errors.hostelName?.errorMessage}
        hasError={errors.hostelName?.hasError}
        {...getOverrideProps(overrides, "hostelName")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={true}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lat,
              lng,
              hostelName,
              address: value,
              street,
              building,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Street"
        isRequired={false}
        isReadOnly={false}
        value={street}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lat,
              lng,
              hostelName,
              address,
              street: value,
              building,
            };
            const result = onChange(modelFields);
            value = result?.street ?? value;
          }
          if (errors.street?.hasError) {
            runValidationTasks("street", value);
          }
          setStreet(value);
        }}
        onBlur={() => runValidationTasks("street", street)}
        errorMessage={errors.street?.errorMessage}
        hasError={errors.street?.hasError}
        {...getOverrideProps(overrides, "street")}
      ></TextField>
      <TextField
        label="Building"
        isRequired={false}
        isReadOnly={false}
        value={building}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lat,
              lng,
              hostelName,
              address,
              street,
              building: value,
            };
            const result = onChange(modelFields);
            value = result?.building ?? value;
          }
          if (errors.building?.hasError) {
            runValidationTasks("building", value);
          }
          setBuilding(value);
        }}
        onBlur={() => runValidationTasks("building", building)}
        errorMessage={errors.building?.errorMessage}
        hasError={errors.building?.hasError}
        {...getOverrideProps(overrides, "building")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || hostel)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || hostel) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
