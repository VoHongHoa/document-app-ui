import { useContext, useState } from "react";
import useWindowSize from "../../../../CustomeHook/useWindowSize";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { AppContext } from "../../../../AppContext";
import { ExceptionResponse, SearchKeyResponse } from "../../../../interface";
import { findSimilarObjects } from "../../../../utils";
import { SearchService } from "../../../../Service";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const { searchKey, handleCloseBackDrop, handleOpenNotify, setSearchResult } =
    useContext(AppContext);
  const { width } = useWindowSize();
  const [showSearchInput, setShowSeachInput] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [keySearchFilter, setKeySearchFilter] = useState<SearchKeyResponse[]>(
    []
  );
  const navigate = useNavigate();
  const handleOnclickSearchIcon = () => {
    const currentState = showSearchInput;
    setShowSeachInput(!currentState);
  };
  const handleOnchangeSearchInput = (value: string) => {
    setSearchInputValue(value);
    const filter = findSimilarObjects(value, searchKey);
    setKeySearchFilter(filter);
  };
  const handleSeach = () => {
    navigate(`/search?filter=${keySearchFilter}`);
    handleCloseBackDrop();
    SearchService.search(keySearchFilter)
      .then((response) => {
        if (response) {
          setSearchInputValue("");
          setKeySearchFilter([]);
          handleCloseBackDrop();
          setSearchResult(response);
          navigate("/search");
        }
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSeach();
    }
  };
  const handleChooseFilter = (item: SearchKeyResponse) => {
    const filter: SearchKeyResponse[] = [];
    filter.push(item);
    setKeySearchFilter(filter);
  };
  const renderSeacrKeyWordFilter = () => {
    if (keySearchFilter.length > 0) {
      return (
        <div className="w-full z-[2000] bg-gray-100 p-2 text-black max-h-[50vh] overflow-y-scroll custom-scrollbar absolute">
          {keySearchFilter.map((item, index) => {
            return (
              <p
                className="cursor-pointer p-2 hover:bg-gray-200 truncate"
                onClick={() => handleChooseFilter(item)}
              >
                {item.label}
              </p>
            );
          })}
        </div>
      );
    }
  };
  const renderSearch = () => {
    if (width <= 1023) {
      return (
        <div className="">
          <SearchIcon onClick={handleOnclickSearchIcon} />
          {showSearchInput && (
            <div className="absolute top-14 left-0 w-full text-black flex flex-row justify-between items-center">
              <input
                className="p-2 w-full"
                placeholder="Search"
                autoFocus
                value={searchInputValue}
                onChange={(e) => handleOnchangeSearchInput(e.target.value)}
              />
              <SendIcon
                className="absolute right-2 text-gray-400"
                fontSize="small"
              />
            </div>
          )}
          {renderSeacrKeyWordFilter()}
        </div>
      );
    }
    return (
      <div className="w-1/2  relative">
        <div className="bg-white mb-1 flex flex-row flex-wrap items-center">
          <input
            className="outline-none p-1 text-black w-[90%]"
            onChange={(e) => handleOnchangeSearchInput(e.target.value)}
            value={searchInputValue}
            onKeyDown={handleKeyDown}
          />
          <div
            className="cursor-pointer z-50 text-black top-1"
            onClick={handleSeach}
          >
            <SearchIcon />
          </div>
        </div>

        {renderSeacrKeyWordFilter()}
      </div>
    );
  };

  return renderSearch();
}
