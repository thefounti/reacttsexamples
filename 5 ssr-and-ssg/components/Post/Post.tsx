import Link from "next/link";
import { FunctionComponent } from "react";

export const Post: FunctionComponent = () => {
    return (
        <Link href='/post/{id}' as='/post/example' passHref>
            <Card>
                <Figure>
                    <img alt='Post photo' src='/image1.jpg'/>
                </Figure>
                <Title>Post title!</Title>
                <Content>
                    <p>
                        Lorem ipsum dolor sit amet, consecteur adipiscing...
                    </p>
                </Content>
            </Card>
        </Link>
    )
}