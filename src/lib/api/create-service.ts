// import axios from "axios";

import { getAuthToken } from "@/app/lib/api/get-token";
import { CreateForm } from "../types";

const baseUrl = 'https://kmuvcd-strapi.onrender.com';

export async function createUserService(category: string, data: CreateForm) {
  const url = new URL(`/api/${category}`, baseUrl)
  const token = await getAuthToken();

  console.log("🚀 Sending data to Strapi:", url.toString(), data);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error("Strapi responded with error", JSON.stringify(json, null, 2));
    } else {
      console.log("✅ Successfully posted to Strapi:", json);
    }

    return json;
  } catch(error) {
    console.error("Create Service Error", error);
  }
}