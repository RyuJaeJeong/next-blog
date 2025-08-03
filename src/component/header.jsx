import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'


const Header = async (props) => {
    const session = await getServerSession(authOptions)
    const userNm = (session)?session.user.name:"로그인"
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" href="/">Next.log()</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/article">List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/article/1">Sample Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/article/form">Form</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/signIn">{userNm}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="masthead">
                <Image src={`${props.image}`} alt={"header 배경 이미지"} fill={true} style={{objectFit: "cover", objectPosition:"center", filter: 'brightness(0.5)'}} priority={true} />
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className={`${(props.isPost)?"post-heading":"site-heading"}`}>
                                <h1 className={`${(props.head)?"":"d-none"}`}>
                                    {props.head}
                                </h1>
                                <h2 className={`subheading ${(props.subhead)?"":"d-none"}`}>
                                    {props.subhead}
                                </h2>
                                <span className={`meta ${(props.meta)?"":"d-none"}`}>
                                    {props.meta}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header