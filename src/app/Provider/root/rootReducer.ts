import { combineReducers } from "@reduxjs/toolkit";
import getTasksSlice from "../../../shared/slicer/tasks/getTasksSlice";
import tokenSlicer from "../../../shared/slicer/token/tokenSlicer";
import addTaskSlice from "../../../shared/slicer/tasks/addTaskSlice";
import getUserInfoSlice from "../../../shared/slicer/user/getUserInfoSlice";
import editTaskSlice from "../../../shared/slicer/tasks/editTaskSlice";
import toggleTaskSlice from "../../../shared/slicer/tasks/toggleTaskSlice";
import deleteTaskSlice from "../../../shared/slicer/tasks/deleteTaskSlice";
import getNoteSlice from "../../../shared/slicer/notes/getNoteSlice";
import createNoteSlice from "../../../shared/slicer/notes/createNoteSlice";
import deleteNoteSlice from "../../../shared/slicer/notes/deleteNoteSlice";
import editNoteSlice from "../../../shared/slicer/notes/editNoteSlice";
import getDetailsSlice from "../../../shared/slicer/details/getDetailsSlice";
import createDetailsSlice from "../../../shared/slicer/details/createDetailsSlice";
import editDetailsSlice from "../../../shared/slicer/details/editDetailsSlice";
import deleteDetailsSlice from "../../../shared/slicer/details/deleteDetailsSlice";

const rootReducer = combineReducers({
  getToken: tokenSlicer,
  tasks: getTasksSlice,
  createTask: addTaskSlice,
  editTask: editTaskSlice,
  statusTask: toggleTaskSlice,
  deleteTask: deleteTaskSlice,
  notes: getNoteSlice,
  createNote: createNoteSlice,
  deleteNote: deleteNoteSlice,
  editNote: editNoteSlice,
  details: getDetailsSlice,
  createDetails: createDetailsSlice,
  editDetails: editDetailsSlice,
  deleteDetail: deleteDetailsSlice,
  getUser: getUserInfoSlice,
});
export default rootReducer;