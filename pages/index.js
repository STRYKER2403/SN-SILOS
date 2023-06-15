import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  return (
    <>
      <div>
        <Head>
          <title>SN SILOS</title>
          <meta name="description" content="SN Silos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="text-gray-600 body-font ">
          
          <div className="flex bg-back bg-no-repeat bg-cover bg-center bg-fixed h-[65vh] opacity-90 text-center items-center justify-center flex-col">
            <div className='md:text-6xl text-3xl text-white font-semibold font-serif '>SN SILOS</div>
            <div className='md:text-4xl text-2xl mb-28 text-white font-semibold font-serif'>Quality that Everyone Trusts!</div>
          </div>
        </section>

        <section className="text-gray-600 body-font bg-black">


          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Wear The Brand With SN SILOS</h1>

              <p className="lg:w-1/2 w-full leading-relaxed text-white text-xl">Quality that Everyone Trusts!</p>
            </div>

          </div>

          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap justify-center">
              
              {data.map((item,index)=>{

              
                 return <Link passHref={true}  key={index} href={`/${item.id}`} className="lg:w-1/5 md:w-1/2 w-full cursor-pointer drop-shadow-lg m-5 bg-gray-800 rounded-lg">
                  <div className=" relative rounded overflow-hidden p-2">
                    <img alt="ecommerce" className="m-auto h-[50vh] md:w-[25vw] " src={item.image} />
                  </div>
                  <div className="text-center bg-gray-800 border-t-2">
                    <h3 className="text-white text-xs tracking-widest title-font mb-1 pt-2">{item.category}</h3>
                    <h2 className="text-white title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1 pb-2 text-white">₹{item.price}</p>

                  </div>
                </Link> 
                })} 

            </div>
          </div>
        </section>



      </div>
    </>
  )
}

export async function getServerSideProps() {
  
  const res = await fetch(`https://fakestoreapi.com/products`)
  const data = await res.json()

  return {
    props: {data}
  }
}