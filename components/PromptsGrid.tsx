import { memo, useCallback } from "react";
import { Prompt } from "../types/database";
import { usePrompts } from "@/contexts/PromptsContext";
import { Grid } from "react-virtualized";
import { AutoSizer } from "react-virtualized";
import { WindowScroller } from "react-virtualized";
import PromptCard from "./PromptCard";

type Props = {
  prompts: Prompt[];
  isLoading: boolean;
  error: Error | null;
};

const PromptsGrid = memo(({ prompts, isLoading }: Props) => {
  const { searchQuery } = usePrompts();

  // Calculate grid dimensions based on viewport width
  const calculateGridDimensions = useCallback(
    (width: number) => {
      // Lower the breakpoint for 3 columns to accommodate standard laptops
      let columnCount = 1; // Default for mobile

      if (width >= 1024) {
        columnCount = 3; // Medium-large screens (most laptops and desktops)
      } else if (width >= 640) {
        columnCount = 2; // Small-medium screens (tablets and small laptops)
      }

      // Calculate the exact number of rows needed based on the actual items
      // This fixes the issue with extra pending items
      const itemCount = prompts?.length || 0;
      const rowCount = Math.ceil(itemCount / columnCount);

      return { columnCount, rowCount };
    },
    [prompts]
  );

  // Render a cell in the grid with smart spacing
  const cellRenderer = ({
    columnIndex,
    rowIndex,
    key,
    style,
    width,
  }: {
    columnIndex: number;
    rowIndex: number;
    key: string;
    style: React.CSSProperties;
    width: number;
  }) => {
    const { columnCount } = calculateGridDimensions(width);
    const index = rowIndex * columnCount + columnIndex;

    // Only show loading state if we're actually loading more items
    // and only for indices that would contain actual items

    // Don't render anything for indices beyond our data
    if (index >= (prompts?.length || 0)) {
      return null;
    }

    const prompt = prompts[index];

    // Calculate smart padding
    // No left padding for first column, no right padding for last column
    const isFirstColumn = columnIndex === 0;
    const isLastColumn = columnIndex === columnCount - 1;

    // Create padding style with smart gaps
    const paddingStyle = {
      paddingLeft: isFirstColumn ? 0 : "0.75rem",
      paddingRight: isLastColumn ? 0 : "0.75rem",
      paddingTop: 0,
      paddingBottom: "1.5rem", // Always add bottom padding for vertical spacing
    };

    return (
      <div
        key={key}
        style={{
          ...style,
          ...paddingStyle,
        }}
      >
        <PromptCard prompt={prompt} />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4">Loading prompts...</p>
      </div>
    );
  }

  return (
    <>
      {/* Found 1 prompt for "searchQuery" */}
      {searchQuery && prompts.length > 0 && (
        <div className="mb-6 flex justify-between items-center">
          <p className="text-zinc-300">
            {`Found ${prompts.length} prompt${
              prompts.length === 1 ? "" : "s"
            } for "${searchQuery}"`}
          </p>
        </div>
      )}

      {searchQuery && prompts.length === 0 && (
        <div className="text-center py-12 text-zinc-400">
          No matching prompts found. Try a different search term.
        </div>
      )}

      {prompts.length > 0 && (
        <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
          {/* <InfiniteLoader
            // isRowLoaded={({ index }) => isItemLoaded(index)}
            // loadMoreRows={loadMoreItems}
            rowCount={prompts.length + 1}
          > */}
          {/* {({ onRowsRendered, registerChild }) => ( */}
          <WindowScroller>
            {({ height, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  const { columnCount, rowCount } =
                    calculateGridDimensions(width);
                  const cellHeight = 390;

                  return (
                    <Grid
                      // ref={registerChild}
                      autoHeight
                      height={height}
                      width={width}
                      scrollTop={scrollTop}
                      columnCount={columnCount}
                      columnWidth={width / columnCount}
                      rowCount={rowCount}
                      rowHeight={cellHeight}
                      cellRenderer={({ columnIndex, rowIndex, key, style }) =>
                        cellRenderer({
                          columnIndex,
                          rowIndex,
                          key,
                          style,
                          width,
                        })
                      }
                      // onSectionRendered={({
                      //   rowStartIndex,
                      //   rowStopIndex,
                      // }) => {
                      //   const startIndex = rowStartIndex * columnCount;
                      //   const stopIndex =
                      //     rowStopIndex * columnCount + (columnCount - 1);
                      //   // onRowsRendered({ startIndex, stopIndex });
                      // }}
                    />
                  );
                }}
              </AutoSizer>
            )}
          </WindowScroller>
          {/* )} */}
          {/* </InfiniteLoader> */}
        </div>
      )}
    </>
  );
});

PromptsGrid.displayName = "PromptsGrid";

export default PromptsGrid;
