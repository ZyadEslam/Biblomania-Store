"use client";

import { useDeferredValue, useMemo } from "react";

export const useRecordFilter = (records, config, searchNameValue, searchNumberValue) => {
  const deferredName = useDeferredValue(searchNameValue);
  const deferredNumber = useDeferredValue(searchNumberValue);

  return useMemo(() => {
    const nameQuery = deferredName.trim();
    const numberQuery = deferredNumber.trim();

    return records.filter((record) => {
      const nameMatches = nameQuery
        ? String(record[config.nameKey] || "").includes(nameQuery)
        : true;
      const numberMatches = numberQuery
        ? String(record[config.numberKey] || "").includes(numberQuery)
        : true;

      return nameMatches && numberMatches;
    });
  }, [deferredName, deferredNumber, records, config.nameKey, config.numberKey]);
};
