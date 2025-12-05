import * as Joi from "joi";
import * as Yup from "yup";

export const loginValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(64)
        .required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .required(),
});

export const loginValidationSchema_Yup = Yup.object().shape({
    username: Yup.string()
        .min(2)
        .max(64)
        .required(),
    password: Yup.string()
        .min(8)
        .max(64)
        .required()
});

export const signUpValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(64)
        .required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .required(),
    repeatPassword: Joi.valid(Joi.ref("password")).required()
});

export const signUpValidationSchema_Yup = Yup.object().shape({
    username: Yup.string()
        .min(2)
        .max(64)
        .required(),
    password: Yup.string()
        .min(8)
        .max(64)
        .required(),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Repeat password is a required field")
});

export const editUserValidationSchema = loginValidationSchema;
export const editUserValidationSchema_Yup = loginValidationSchema_Yup;