import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";

export default (path, name) => createSvgIcon(<path d={path} />, name);
