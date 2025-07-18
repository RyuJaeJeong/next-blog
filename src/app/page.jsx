import styles from "./page.module.css";
import Link from 'next/link'
import Header from '@/component/header'

const home = ()=>{
  return(
      <>
        <Header image={"./home-bg.jpg"} head={"Clean Blog"} subhead={"A Blog Theme by Start Bootstrap"} meta={""} />
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-preview">
                <Link href={`/article`}>
                  <h2 className="post-title">Man must explore, and this is exploration at its greatest</h2>
                  <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3>
                </Link>
                <p className="post-meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on September 24, 2023
                </p>
              </div>
              <hr className="my-4"/>
              <div className="post-preview">
                <Link href={`/article`}>
                  <h2 className="post-title">I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.</h2>
                </Link>
                <p className="post-meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on September 18, 2023
                </p>
              </div>
              <hr className="my-4"/>
              <div className="post-preview">
                <Link href={`/article`}>
                  <h2 className="post-title">
                    Science has not yet mastered prophecy
                  </h2>
                  <h3 className="post-subtitle">
                    We predict too much for the next year and yet far too little for the next ten.
                  </h3>
                </Link>
                <p className="post-meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on August 24, 2023
                </p>
              </div>
              <hr className="my-4"/>
              <div className="post-preview">
                <Link href={`/article`}>
                  <h2 className="post-title">Failure is not an option</h2>
                  <h3 className="post-subtitle">Many say exploration is part of our destiny, but it’s actually our duty
                    to future generations.</h3>
                </Link>
                <p className="post-meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  on July 8, 2023
                </p>
              </div>
              <hr className="my-4"/>
              <div className="d-flex justify-content-end mb-4">
                <a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default home