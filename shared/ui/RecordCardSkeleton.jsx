import { memo } from "react";

const RecordCardSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="order-placeholder opacity-5 rounded-lg p-4 shadow-sm animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="order-data space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-3 w-20 bg-gray-300 rounded" />
                  <span className="text-gray-400">:</span>
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-4">
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
              <span className="flex gap-3">
                <div className="h-6 w-6 bg-gray-300 rounded-full" />
                <div className="h-6 w-6 bg-gray-300 rounded-full" />
              </span>
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(RecordCardSkeleton);
