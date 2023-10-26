import { Table } from "@tanstack/react-table";

export function filterColumns(search: string, table: Table<any>) {
  if (search.includes("->")) {
    let [parameters, returnType] = search.split("->");
    let parameter_array = parameters
      .split(",")
      .map((parameter) => parameter.trim());
    returnType.trim();
    table
      .getColumn("parameters")
      ?.setFilterValue(
        parameter_array.length === 1 && parameter_array[0] === ""
          ? ""
          : parameter_array
      );
    table.getColumn("returnType")?.setFilterValue(returnType);
    // reset other filter
    table.getColumn("name")?.setFilterValue("");
  } else {
    table.getColumn("name")?.setFilterValue(search);
    // reset other filters
    table.getColumn("parameters")?.setFilterValue("");
    table.getColumn("returnType")?.setFilterValue("");
  }
}
