// src/features/formComment/formCommentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormFieldItem {
    parsedOption: any;
    internalName: string;
    Title?: string;
  // thêm các field bạn cần
}

interface FormCommentState {
  titleForm: string;
  fieldsGroup: FormFieldItem[][];
  formData: any | null; // dữ liệu formData
  loadingStructure: boolean;
  loadingData: boolean;
  errorStructure: string | null;
  errorData: string | null;
  ItemID?: number | null;
  ListID?: string | null;
}

const initialState: FormCommentState = {
  titleForm: "",
  fieldsGroup: [],
  formData: null,
  loadingStructure: false,
  loadingData: false,
  errorStructure: null,
  errorData: null,
  ItemID: null,
  ListID: null,
};

const formCommentSlice = createSlice({
  name: "formComment",
  initialState,
  reducers: {
    // Các action load cấu trúc form
    fetchFormStructureRequest(state) {
      state.loadingStructure = true;
      state.errorStructure = null;
    },
    fetchFormStructureSuccess(
      state,
      action: PayloadAction<{ titleForm: string; fieldsGroup: FormFieldItem[][] }>
    ) {
      state.loadingStructure = false;
      state.titleForm = action.payload.titleForm;
      state.fieldsGroup = action.payload.fieldsGroup;
    },
    fetchFormStructureFailure(state, action: PayloadAction<string>) {
      state.loadingStructure = false;
      state.errorStructure = action.payload;
    },

    // Các action load dữ liệu form
    fetchFormDataRequest(state) {
      state.loadingData = true;
      state.errorData = null;
    },
    fetchFormDataSuccess(state, action: PayloadAction<any>) {
      state.loadingData = false;
      state.formData = action.payload;
    },
    fetchFormDataFailure(state, action: PayloadAction<string>) {
      state.loadingData = false;
      state.errorData = action.payload;
    },
    fetchSetItemID(state, action: PayloadAction<number | null>) {
      state.ItemID = action.payload;
    },
    fetchSetListID(state, action: PayloadAction<string | null>) {
      state.ListID = action.payload;
    }

  },
});

export const {
  fetchFormStructureRequest,
  fetchFormStructureSuccess,
  fetchFormStructureFailure,
  fetchFormDataRequest,
  fetchFormDataSuccess,
  fetchFormDataFailure,
  fetchSetItemID,
  fetchSetListID
} = formCommentSlice.actions;

export default formCommentSlice.reducer;
