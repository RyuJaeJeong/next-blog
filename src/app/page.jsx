import Link from 'next/link'
import Header from '@/component/header'

const home = ()=>{
  return(
      <>
        <Header image={"./about-bg.jpg"} head={"Next Blog"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
        <div className="mb-4">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur
                  voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam
                  ducimus consectetur?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque
                  architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum
                  in officia voluptas voluptatibus, minus!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid
                  ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit
                  tempora!
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default home