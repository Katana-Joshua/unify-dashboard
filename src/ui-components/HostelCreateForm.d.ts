/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HostelCreateFormInputValues = {
    lat?: number;
    lng?: number;
    hostelName?: string;
    address?: string;
    street?: string;
    building?: string;
};
export declare type HostelCreateFormValidationValues = {
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    hostelName?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    street?: ValidationFunction<string>;
    building?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HostelCreateFormOverridesProps = {
    HostelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    hostelName?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    street?: PrimitiveOverrideProps<TextFieldProps>;
    building?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HostelCreateFormProps = React.PropsWithChildren<{
    overrides?: HostelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HostelCreateFormInputValues) => HostelCreateFormInputValues;
    onSuccess?: (fields: HostelCreateFormInputValues) => void;
    onError?: (fields: HostelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HostelCreateFormInputValues) => HostelCreateFormInputValues;
    onValidate?: HostelCreateFormValidationValues;
} & React.CSSProperties>;
export default function HostelCreateForm(props: HostelCreateFormProps): React.ReactElement;
