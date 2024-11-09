import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import errorHandler from "../errorHandler";
import api from "../api";

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/employee/create", data);
      if (response.status === 201 && response?.data?.data) {
        return response.data.data;
      } else {
        throw Error("Failed to add employee");
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const listEmployee = createAsyncThunk(
  "employee/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`employee/list`);
      if (response.status === 200 && response?.data) {
        return response.data;
      } else {
        throw Error("Failed to fetch employee");
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employee/edit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/employee/${id}`);
      if (response.status === 200 && response?.data?.data) {
        return response.data.data;
      } else {
        throw Error("Failed to fetch employee");
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/employee-update/${id}`, data);
      if (response.status === 200 && response?.data) {
        return response.data;
      } else {
        throw Error("Failed to update employee");
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "employee/remove",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/employee-remove/${id}`);
      if (response.status === 200) {
        return { id: id };
      } else {
        throw Error("Failed to delete employee");
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    error: null,
    employee: [],
    totalEmployees: 0,
    currentEmployee: {},
  },
  reducers: {
    clearCurrentEmployee: (state) => {
      state.currentEmployee = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentEmployee = {};
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee.unshift(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(listEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentEmployee = {};
        state.employee = [];
        state.totalEmployees = 0;
      })
      .addCase(listEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload.data.length
          ? action.payload.data.map((item) => {
              return Object.assign(item, {
                createdAt: new Date(item.createdAt).toLocaleString(),
              });
            })
          : [];
        state.totalEmployees = Object.keys(action.payload.data).length;
      })
      .addCase(listEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentEmployee = {};
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = state.employee.map((i) => {
          return i._id === action.payload._id ? action.payload : i;
        });
        state.currentEmployee = action.payload;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        action.payload.createdAt = new Date(
          action.payload.createdAt
        ).toLocaleString();
        state.employee = state.employee.map((value) => {
          return value._id === _id ? action.payload : value;
        });
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.employee = state.employee.filter((value) => value._id !== id);
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { clearCurrentEmployee, getCurrentEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
