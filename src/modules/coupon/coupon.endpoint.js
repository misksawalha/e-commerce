import { roles } from "../../services/roles.js";

export const endPoint={
    Add:[roles.Admin],
    Update:[roles.Admin],
    Delete:[roles.Admin],
}