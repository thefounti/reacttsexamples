import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document{
    render() {
        const description='The next generation of a news feed'
        const fontsUrl='https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'

        return (
            <Html>
                <Head>
                    <meta name="description" content={description}/>
                    <link href={fontsUrl} rel="stylesheet" />
                    {this.props.styles}
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}