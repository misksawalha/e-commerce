import { roles } from "../../services/roles.js";

export const endPoint={
    Add:[roles.User],
    Update:[roles.Admin],
    profile:[roles.User],
    Delete:[roles.User]
}