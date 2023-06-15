

const Slug = ({ addToCart, data }) => {
    return (

        <div>
            <section className="text-gray-600 body-font overflow-hidden min-h-screen bg-black">
                <div className="container px-5 py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-16 object-cover object-top rounded shadow-md" src={data.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-white tracking-widest">SN SILOS</h2>
                            <h1 className="text-white text-3xl title-font font-medium mb-1">{data.title}</h1>
                            <div className="flex mb-4">

                            </div>
                            <p className="leading-relaxed my-4 text-white">{data.description}</p>
                            <div className="flex ">
                                <span className="title-font font-medium text-2xl text-white">₹{data.price}</span>
                                <button className="flex ml-3 md:ml-6 text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded">Buy Now</button>
                                <button onClick={() => { addToCart(data.id, 1, data.price, data.title) }} className="flex ml-4 text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export async function getServerSideProps(context) {
    const res = await fetch(`https://fakestoreapi.com/products/${context.query.slug}`)
    const data = await res.json()

    return {
        props: { data }
    }
}

export default Slug