import { createSvgIcon } from "@mui/material/SvgIcon";

export default (path, name) => createSvgIcon(<path d={path} />, name);
