import classNames from "classnames";
import { ClassValue } from "classnames/types";
import { useMemo } from "react";



export default function useClassNames(...classes: Array<ClassValue>) {
  return useMemo(() => classNames(classes), classes);
}