"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchAPI = async () => {
    let formData = {
      page,
      search,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      setApiData(responseData.data);
      setTotalPages(responseData.totalpages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [page, search]);

  return (
    <main className="max-w-7xl mx-auto">
      <form className="flex justify-center items-center mb-5">
        <input
          className="w-[50%] h-[35px] outline-none border border-gray-300 rounded-l-md px-2"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(parseInt(1))
          }}
        />
        <button className="px-2 w-fit h-[35px] rounded-r-md bg-gray-400">
          search
        </button>
      </form>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {apiData.map((item) => (
          <div key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Stack spacing={2}>
          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            onChange={(e, value) => {
              if (value !== null) {
                setPage(value);
              }
            }}
          />
        </Stack>
      </div>
    </main>
  );
}
