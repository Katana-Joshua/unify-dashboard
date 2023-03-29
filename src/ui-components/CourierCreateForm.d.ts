/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourierCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    lat?: number;
    lng?: number;
    transportationMode?: string;
    ratings?: number;
    sub?: string;
};
export declare type CourierCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    transportationMode?: ValidationFunction<string>;
    ratings?: ValidationFunction<number>;
    sub?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourierCreateFormOverridesProps = {
    CourierCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    transportationMode?: PrimitiveOverrideProps<SelectFieldProps>;
    ratings?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CourierCreateFormProps = React.PropsWithChildren<{
    overrides?: CourierCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourierCreateFormInputValues) => CourierCreateFormInputValues;
    onSuccess?: (fields: CourierCreateFormInputValues) => void;
    onError?: (fields: CourierCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourierCreateFormInputValues) => CourierCreateFormInputValues;
    onValidate?: CourierCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourierCreateForm(props: CourierCreateFormProps): React.ReactElement;
