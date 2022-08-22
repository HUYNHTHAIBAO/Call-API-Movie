import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import LoadingSkeleton from "./loading/LoadingSkeleton";

const MovieSearchAPI = () => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState();
  const queryDebounce = useDebounce(query, 500);
  // console.log(queryDebounce);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=647c2db1d376cfd9a87f5a11d1108e6b&query='${queryDebounce}'`
        );
        if (response.data.results) {
          setMovie(response.data.results);
          console.log(response.data.results);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [queryDebounce]);
  return (
    <div className="p-[100px]">
      <div className="text-center">
        <input
          className="border border-[#ccc] py-[10px] px-[20px] w-[400px] outline-0 rounded"
          type="search"
          name="search"
          id=""
          placeholder="Search movie..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading && (
        <div className="grid grid-col-5 gap-10 mt-[50px]">
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
          <MovieLoading></MovieLoading>
        </div>
      )}
      <div className="grid grid-cols-5 gap-10 mt-[50px] ">
        {!loading &&
          movie?.map((item) => (
            <MovieItem key={item.id} props={item}></MovieItem>
          ))}
      </div>
    </div>
  );
};
const MovieLoading = () => {
  return (
      <div className="border border-[#ccc] flex flex-col ">
        <div className="w-[400px] h-[400px] ">
          <LoadingSkeleton width="100%" height="100%"></LoadingSkeleton>
        </div>
        <div className="p-[20px] flex flex-1 flex-col">
          <h2 className="font-bold pb-4">
            <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
          </h2>
          <p className="pb-4 opacity-40">
            <LoadingSkeleton width="100%" height="10px"></LoadingSkeleton>
            <div className="h-2"></div>
            <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
            <div className="h-2"></div>
            <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
          </p>
          <div className="flex mt-auto">
            <span>
              <LoadingSkeleton width="50px" height="20px"></LoadingSkeleton>
            </span>
          </div>
        </div>
      </div>
  );
};

const MovieItem = ({ props }) => {
  return (
    <div className="border border-[#ccc] flex flex-col rounded-2xl bg-[#cbd5e1] cursor-pointer">
      <div className="w-[200px] h-[200px] mx-auto">
        <img
          className="p-2 object-cover object-center w-full h-full rounded-xl "
          src={`https://image.tmdb.org/t/p/original/${props.poster_path}`}
          alt=""
        />
      </div>
      <div className="p-[20px] flex flex-1 flex-col">
        <h2 className="font-bold pb-4 ">{props.title}</h2>
        <p className="pb-4 opacity-40 text-sm ">{props.overview}</p>
        <div className="flex mt-auto">
          <span>{props.vote_average}</span>
        </div>
      </div>
    </div>
  );
};
export default MovieSearchAPI;
