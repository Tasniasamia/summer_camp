import { get, post, put, del } from "../utils/apiMethods";

// GET with optional pagination & search params
export const GetTeamMembers = (params = {}) => get("/teams", params);

// POST
export const AddTeamMember = (payload) => post("/teams", payload);

// PUT
export const UpdateTeamMember = (id, payload) => put(`/teams/${id}`, payload);

// DELETE
export const DeleteTeamMember = (id) => del(`/teams/${id}`);
