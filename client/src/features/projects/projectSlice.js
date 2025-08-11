import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjects, addProject, deleteProject } from './projectService';

export const getProjects = createAsyncThunk('projects/get', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  return await fetchProjects(token);
});

export const createProject = createAsyncThunk('projects/create', async (data, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  return await addProject(data, token);
});

export const removeProject = createAsyncThunk('projects/delete', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  return await deleteProject(id, token);
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => { state.loading = true; })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.meta.arg);
      });
  },
});

export default projectSlice.reducer;
