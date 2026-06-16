"use client";

import { memo, useCallback, useState } from "react";
import RecordCardSkeleton from "@/shared/ui/RecordCardSkeleton";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 6;

const RecordsListView = ({
  records,
  isLoading,
  error,
  emptyMessage,
  loadMoreLabel,
  renderCard,
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => current + LOAD_MORE_COUNT);
  }, []);

  if (isLoading) {
    return <RecordCardSkeleton />;
  }

  if (error) {
    return <p className="empty-state">{error}</p>;
  }

  if (records.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  const displayedRecords = records.slice(0, visibleCount);

  return (
    <div className="space-y-4">
      {displayedRecords.map((record) => renderCard(record))}

      {records.length > visibleCount ? (
        <button type="button" className="btn-secondary w-full" onClick={handleLoadMore}>
          {loadMoreLabel}
        </button>
      ) : null}
    </div>
  );
};

export default memo(RecordsListView);
