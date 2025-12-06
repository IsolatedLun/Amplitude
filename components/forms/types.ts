import { ISongForm } from "@/api/types";

export enum ESongFormikMode { Upload, Edit };
export interface ISongFormik {
    mode: ESongFormikMode,
    onSubmit: (v: ISongForm, resetFormFunc: () => void) => void,
    initialValues: ISongForm,

    isSubmitting: boolean
}