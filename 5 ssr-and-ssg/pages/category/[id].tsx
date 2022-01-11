import { GetStaticProps } from "next";
import { fetchPosts } from "../../api/category";
import { Post } from "../../shared/types";
import { categoryPaths as paths } from "../../shared/staticPaths";
import React,{ FunctionComponent } from "react";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader";
import { Section } from "../../components/Section";

interface CategoryProps {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({ params }) => {
    if (typeof params.id !== "string") throw new Error("Unexpected it")
    const posts = await fetchPosts(params.id)
    return { props: { posts } }
}

export async function getStaticPaths() {
    return { paths, fallback: true }
}

const Category: FunctionComponent<CategoryProps> = ({ posts }) => {
    const router=useRouter()

    if(router.isFallback) return <Loader />
    return <Section posts={posts} title={String(router.query.id)} />
}

export default Category