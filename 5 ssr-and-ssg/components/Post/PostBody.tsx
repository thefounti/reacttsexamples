import { FunctionComponent } from "react";
import Link from "next/link";
import { Post } from "../../shared/types";
import { Content, Figure, Meta, Title } from "./PostBodyStyle";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

interface PostBodyProps {
    post: Post
}

export const PostBody: FunctionComponent<PostBodyProps> = ({ post }) => {
    return (
        <div>
            <Breadcrumbs post={post} />
            <Title>{post.title}</Title>
            <Figure>
                <img src={post.image} alt={post.title} />
            </Figure>
            <Content dangerouslySetInnerHTML={{ __html: post.content }} />

            <Meta>
                <span>{post.date}</span>
                <span>&middot;</span>
                <Link href="/category/[id]" as={`/category/${post.category}`}>
                    <a>{post.category}</a>
                </Link>
                <span>&middot;</span>
                <a href={post.source}>Source</a>
            </Meta>
        </div>
    )
}