import * as React from "react";
import { createSvgIcon } from "@material-ui/core/utils";

export default (path, name) => createSvgIcon(<path d={path} />, name);
