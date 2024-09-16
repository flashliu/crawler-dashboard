import axios from "axios";

export type Listing = {
  id: string;
  source_id: string;
  description: string;
  brand: string;
  url: string;
  year: string;
  first_image: number;
  images: string[];
  is_processed: string;
  reference: string;
  collection: string;
};
export type Source = {
  id: number;
  url: string;
  type: string;
  paging_field: string;
  query_template: string;
  paging_type: string;
  body_template: string;
  id_regular: string;
  last_updated: string;
  task?: Task;
};

export type Task = {
  id: string;
  insert_count: number;
  update_count: number;
  delete_count: number;
  status: "pending" | "running" | "complete" | "fail";
  started: number;
  ended: number;
  source_id: string;
  error: string;
};

export const getSources = async (page: number, pageSize: number) => {
  return await axios.get<{ list: Source[]; count: number }>(
    "/admin/rolexcpo_api/sources.json",
    {
      params: {
        page,
        pageSize,
      },
    }
  );
};

export const sourceEdit = async (source: Source) => {
  return await axios.post("/admin/rolexcpo_api/source_edit.json", source);
};

export const sourceAdd = async (source: Source) => {
  return await axios.post("/admin/rolexcpo_api/source_add.json", source);
};

export const sourceDelete = async (source_id: number) => {
  return await axios.delete("/admin/rolexcpo_api/source_delete.json", {
    params: {
      source_id,
    },
  });
};

export const sourceScrap = async (source_id: number) => {
  return await axios.post<{ task: Task }>(
    "/admin/rolexcpo_api/source_scrap.json",
    {
      source_id,
    }
  );
};

export const sourceScrapMulti = async (source_ids: number[]) => {
  return await axios.post<{ task: Task }>(
    "/admin/rolexcpo_api/source_scrap_multi.json",
    {
      source_ids,
    }
  );
};

export const getTasks = async (page: number, pageSize: number) => {
  return await axios.get<{ list: Source[]; count: number }>(
    "/admin/rolexcpo_api/tasks.json",
    {
      params: {
        page,
        pageSize,
      },
    }
  );
};

export const getTask = async (id: string) => {
  return await axios.get<{ data: Task }>(
    `/admin/rolexcpo_api/tasks/${id}.json`
  );
};

export const getListings = async (
  source_id: number | string,
  page: number,
  pageSize: number
) => {
  return await axios.get<{ list: Listing[]; count: number }>(
    "/admin/rolexcpo_api/listings.json",
    {
      params: {
        source_id,
        page,
        pageSize,
      },
    }
  );
};
