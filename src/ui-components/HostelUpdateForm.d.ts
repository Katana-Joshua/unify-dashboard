/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Hostel } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HostelUpdateFormInputValues = {
    lat?: number;
    lng?: number;
    hostelName?: string;
    address?: string;
    street?: string;
    building?: string;
};
export declare type HostelUpdateFormValidationValues = {
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    hostelName?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    building?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HostelUpdateFormOverridesProps = {
    HostelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    hostelName?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    building?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HostelUpdateFormProps = React.PropsWithChildren<{
    overrides?: HostelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    hostel?: Hostel;
    onSubmit?: (fields: HostelUpdateFormInputValues) => HostelUpdateFormInputValues;
    onSuccess?: (fields: HostelUpdateFormInputValues) => void;
    onError?: (fields: HostelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HostelUpdateFormInputValues) => HostelUpdateFormInputValues;
    onValidate?: HostelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HostelUpdateForm(props: HostelUpdateFormProps): React.ReactElement;
