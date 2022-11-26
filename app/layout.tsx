import '../styles/globals.css'
import ReactQueryWrapper from './ReactQueryWrapper'

interface Props {
    children: React.ReactNode
}


const RootLayout = ({ children }: Props) => (
    <html lang="en" >
        <head>
            <link href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap' rel='stylesheet' />
        </head>
        <body className="font-raleway">
            <ReactQueryWrapper>
                {children}
            </ReactQueryWrapper>
        </body>
    </html>
)

export default RootLayout