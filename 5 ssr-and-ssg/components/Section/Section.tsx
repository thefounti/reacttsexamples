import { FunctionComponent } from "react";

interface SectionProps{
    title:string
}

export const Section:FunctionComponent<SectionProps> = ({title}) => {
    return (
        <section>
            <Title>{title}</Title>
            <Grid>
                <Post />
                <Post />
                <Post />
            </Grid>
        </section>
    )
}