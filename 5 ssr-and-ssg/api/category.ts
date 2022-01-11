import fetch from "node-fetch";
import { EntityId } from "../shared/types";
import { config } from "./config";

export async function fetchPosts(categoryId: EntityId) {
    const url = `${config.baseUrl}/categories/${categoryId}`
    const res = await fetch(url)
    return await res.json()
}