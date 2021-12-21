import { FunctionComponent } from "react";
import { Grid } from "./style";

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