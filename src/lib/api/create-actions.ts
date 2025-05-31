'use server'

import { z } from "zod";
import { createUserService } from "./create-service";
import generateNickname from "../data/generate-nickname";
import { CreateForm } from "../types";
import { tags } from "../data/tags";

export async function createAction(
  prevState: CreateForm,
  formData: FormData,
  realname: string,
  wantAnon: boolean,
) {
  console.log("Hello from create user Action");

  const name = formData.get("name");
  const author = realname;
  const nickname = wantAnon ? generateNickname() : "";
  const category = formData.get("category") === '행사' ? 'events' : 'exhibitions';

  const tagsOfCategory = tags.find((tag) => tag.tag === category)?.sub_tags;
  const tagsIWant = tagsOfCategory?.filter((tag) => formData.getAll('tags').includes(tag.name));
  const documentIds = tagsIWant?.map((tag) => tag.documentId) ?? [];
  const finalTags =
    category === 'events'
      ? [...documentIds, 'ihutisnkmoajpxnnner0e8wk']
      : [...documentIds, 'll1zxidiedjg7pdvsoxyxnqj'];
  
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate") ?? null;
  const location = formData.get("location");



  const websiteMap = new Map<number, { name?: string; url?: string }>();

  for (const [key, value] of formData.entries()) {
    const nameMatch = key.match(/^name-(\d+)$/);
    const urlMatch = key.match(/^url-(\d+)$/);

    if (nameMatch) {
      const index = Number(nameMatch[1]);
      const entry = websiteMap.get(index) || {};
      entry.name = value.toString();
      websiteMap.set(index, entry);
    }

    if (urlMatch) {
      const index = Number(urlMatch[1]);
      const entry = websiteMap.get(index) || {};
      entry.url = value.toString();
      websiteMap.set(index, entry);
    }
  }

  const websites = Array.from(websiteMap.values())
    .filter(w => w.name || w.url)
    .map(w => ({
      name: w.name?.trim() || null,
      url: w.url?.trim() || null,
    }));
  
  // 일단 텍스트만.
  const dynamicMap = new Map<number, { __component?: string; text_block?: string }>();

  for (const [key, value] of formData.entries()) {
    const textMatch = key.match(/^text_block-(\d+)$/);

    if (textMatch) {
      const index = Number(textMatch[1]);
      const entry = dynamicMap.get(index) || {};
      entry.text_block = value.toString();
      entry.__component = "dynamic.text-block";
      dynamicMap.set(index, entry);
    }
  }

  const dynamics = Array.from(dynamicMap.values())
    .filter(w => w.text_block)
    .map(w => ({
      __component: "dynamic.text-block",
      text_block: w.text_block?.trim() || null,
    }));
  
  const isApproved = false;

  const schemaCreate = z.object({
    name: z.string(),
    author: z.string(),
    nickname: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    startDate: z.string(),
    endDate: z.string().nullable(),
    location: z.string(),
    website: z.array(z.object({name: z.string(), url: z.string()})),
    dynamic: z.array(
      z.union([
        z.object({
          __component: z.literal("dynamic.image-block"),
          image_block: z.any(), // or shape it more strictly if needed
        }),
        z.object({
          __component: z.literal("dynamic.text-block"),
          text_block: z.string(),
        }),
      ])
    ),
    isApproved: z.boolean(),
  })

  const validatedFields = schemaCreate.safeParse({
    name,
    author,
    nickname,
    category,
    tags: finalTags,
    startDate,
    endDate,
    location,
    website: websites,
    dynamic: dynamics,
    isApproved,
  });

  if (!validatedFields.success) {
    console.error("❌ Validation failed:", validatedFields.error.flatten());

    return {
      ...prevState,
      message: "Missing Fields",
    }
  }

  const categoryString = category?.toString() ?? '';
  const responseData = await createUserService(categoryString, validatedFields.data);

  console.log(responseData)
}