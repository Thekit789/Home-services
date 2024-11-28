import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

interface Service {
  service_id: number;
  service_name: string;
  sub_services: {
    sub_service_id: number;
    description: string;
    unit: string;
    unit_price: number;
  }[];
}

type ServiceResponse = {
  data: Service | null;
  error?: string;
};

export default async function getServiceById(
  req: NextApiRequest,
  res: NextApiResponse<ServiceResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ data: null, error: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        service_id,
        service_name,
        sub_services (
          service_id,
          description,
          unit,
          unit_price
        )
      `
      )
      .eq("service_id", id)
      .single();

    if (error) {
      console.error("Error fetching service:", error);
      return res
        .status(500)
        .json({ data: null, error: "An unexpected error occurred" });
    }

    if (!data) {
      return res.status(404).json({ data: null, error: "Service not found" });
    }

    return res.status(200).json({ data: data as Service });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ data: null, error: "An unexpected error occurred" });
  }
}
